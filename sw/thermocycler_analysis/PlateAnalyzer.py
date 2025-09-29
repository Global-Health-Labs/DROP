import pandas as pd
from scipy import optimize
import numpy as np
import sklearn
from sklearn.metrics import r2_score, mean_squared_error
import matplotlib.pyplot as plt

def logistic_model(x, a, b, c, d, e):
    # Define the form of the logistic function to be fit:
    return a / (1+np.exp(-1*((x-b)/c))) + d + e*x


def first_derivative(x, a, b, c, d, e):
    return a*(np.exp(-1*((x-b)/c)))/(1+np.exp(-1*((x-b)/c)))**2 + e


def second_derivative(x, a, b, c, d, e):
    return a/c*(np.exp((2*b+x)/c)-np.exp((b+2*x)/c))/(c*(np.exp(b/c)+np.exp(x/c))**3)

def make_plots(data_dict, file_name):
    #Loads fluorophores included in file as data_keys
    data_keys = list(data_dict.keys())
 
    # Dictionary of dimensions for different plate sizes. 
    # Currently only run 96 and 384 well plates, can be updated as needed. 
    plate_sizes = {'96': {
                'img_rows': 8,
                'img_cols': 12,
                'figx_each': 6,
                'figy_each': 4},
                   '384': {
                'img_rows': 16,
                'img_cols': 24,
                'figx_each': 6,
                'figy_each': 4}}
    
    plate_size = data_dict[data_keys[1]].shape[1]
    
    # Sets dimensions of PDFs using the plate size information. 
    img_rows = plate_sizes[str(plate_size)]['img_rows']
    img_cols = plate_sizes[str(plate_size)]['img_cols']
    figx_each = plate_sizes[str(plate_size)]['figx_each']
    figy_each = plate_sizes[str(plate_size)]['figy_each']

    # Generates one PDF file for each fluorophore in the data file. Each PDF contains 
    # an individual graph for each well in the orientation of the experiment plate. 
    for fluor in data_keys:
        fig0, axs0 = plt.subplots(img_rows, img_cols, sharex=True, sharey=True,
                              figsize=(figx_each*img_cols, figy_each*img_rows), squeeze=True)
        axs0 = axs0.flatten()
        var = data_dict[fluor]

        for i, each in enumerate(data_dict[fluor].columns):
            each_title = "Well " + each
            axs0[i].plot(data_dict[fluor].index, var[each])
            axs0[i].set_title(each_title)

        plt.savefig(file_name + '_' + fluor + '_plot.pdf')
        #plt.show()
    return 

class PlateAnalyzer:
    def __init__(self, filename):
        self.filename = filename
    
    def load_data(self):
        # Load data from all sheets in excel file
        data_dict = pd.read_excel(self.filename, sheet_name=None)

        self.run_info = data_dict.pop('Run Information')

        # Reformat dataframe to remove unnamed column and set index to cycle numbers
        for fluor in data_dict.keys():
            data_dict[fluor] = data_dict[fluor].loc[:, ~data_dict[fluor].columns.str.contains('Unnamed')]
            data_dict[fluor] = data_dict[fluor].set_index('Cycle')
        self.data_dict = data_dict

    def analyze(self, f=logistic_model, fit_params:dict=None):
        # Load the data into memory
        self.load_data()

        # Dataframes to contain the combined params and qoi information
        combined_params = pd.DataFrame()
        combined_qoi = pd.DataFrame()

        for fluor in self.data_dict.keys():
            self.data_df = self.data_dict[fluor]
            
            # Set up default fit parameter bounds for fitting search space
            bounds = ([0, 0, 0.5, 0, -100], 
                      [1e6, int(1.2*self.data_df.shape[0]), 100, 2e5, 100])
            self.fit_params = fit_params or dict(maxfev=25000, method='trf', bounds=bounds)
            
            # Fit the model to the data:
            params_df = self.compute_model_fits(self.data_df, f)

            # Compute quantities of interest (QoIs):
            qoi_df = self.compute_QoIs(params_df)

            params_df['Fluorophore'] = fluor
            qoi_df['Fluorophore'] = fluor

            #appends to combined params and qoi variables)
            combined_params = pd.concat([combined_params, params_df])
            combined_qoi = pd.concat([combined_qoi, qoi_df])

        return combined_params, combined_qoi, self.data_dict

        
    def compute_model_fits(self, df: pd.DataFrame, f=logistic_model):
        # Gather the column names:
        columns = df.columns

        # For fitting, the X values will always be the cycle number, which is the index:
        X = df.index.values

        # Initialize an empty dictionary for the results to be placed in
        results = {}

        # Each row in the well plate
        for col in columns:
            if col == 'Cycle':
                continue

            Y = df[col].values

            # Fit the model (by default, the logistic_model function) to the data:
            try:
                popt, pcov =  optimize.curve_fit(f, X, Y, **self.fit_params)
                Y_fit = f(X, *popt)
            except:
                popt = [None,None,None,None,None]
            
            results[col] = popt
        
        # Format the results of the fit parameters into a dataframe:
        results = pd.DataFrame(data=results)
        results = results.T
        results.columns = ['F_max','C_half', 'k', 'F_b', 'DriftSlope']

        # Return the fit parameters as a dataframe
        return results

    def compute_QoIs(self, params_df):
        wells = {}

        for well_label, row in params_df.iterrows():
            # The model fit parameters are the row values:
            params = row.values
            
            # Compute the model values and the second derivatives
            n = 100
            x = np.arange(0,120*n)/n
            y = logistic_model(x, *params)

            # It's useful to have the function defined for the parameters we'll use, and
            log_model = lambda x: logistic_model(x, *params)

            # Gather the original data used for building the model to compute R^2 fit
            y_data = self.data_df[well_label].values
            y_model = log_model(np.arange(y_data.shape[0])+1)
            model_r2_score = r2_score(y_data, y_model)
            
            # The maximum and minimum value in the second derivative vector:
            d2ydx2 = second_derivative(x, *params)
            maxval = np.amax(d2ydx2)
            minval = np.amin(d2ydx2)

            #print(well_label, row, maxval, minval)
            
            # Compute the quantities of interest!
            if maxval == minval or np.isnan(maxval) or np.isnan(minval):
                C_liftoff = np.NaN
                F1 = np.NaN
                C_slowdown = np.NaN
                F2 = np.NaN
                deltaC = np.NaN
            else:
                C_liftoff = np.where(d2ydx2==maxval)[0][0]/n
                F1 = log_model(C_liftoff)
                C_slowdown = np.where(d2ydx2==minval)[0][0]/n
                F2 = log_model(C_slowdown)
                deltaC = C_slowdown-C_liftoff
            
            F_max_QoI = max(y)
            F_0 = min(y)
            deltaF = F_max_QoI-F_0
            
            C_half = params[1]
            dFdC_half = first_derivative(C_half, *params)
            
            # Save the computed values to a dictionary
            wells[well_label] = [F_0, F1, F2, F_max_QoI, deltaF, model_r2_score,
                                C_half, dFdC_half, C_liftoff, C_slowdown, deltaC]

        # Convert the dictionary to a DataFrame, transpose, and format the columns
        qoi_df = pd.DataFrame(data=wells).T
        qoi_df.columns = ['F_0', 'F_1', 'F_2', 'F_max', 'deltaF', 'R2_score',
                          'C_half', 'dFdC_half', 'C_lift', 'C_slow', 'deltaC']
        
        # Return the dataframe with quantities of interest
        return qoi_df



class PlateAnalyzerDataframe(PlateAnalyzer):
    def __init__(self, df):
        self.data_df = df
    
    def analyze(self, f=logistic_model, fit_params:dict=None):
        # Set up default fit parameter bounds for fitting search space
        bounds = ([0, 0, 0.5, 0, -100], 
                  [1e6, int(1.2*self.data_df.shape[0]), 100, 2e5, 100])  
        self.fit_params = fit_params or dict(maxfev=25000, method='trf', bounds=bounds)

        # Fit the model to the data:
        params_df = self.compute_model_fits(self.data_df, f)

        # Compute quantities of interest (QoIs):
        qoi_df = self.compute_QoIs(params_df)

        return params_df, qoi_df
