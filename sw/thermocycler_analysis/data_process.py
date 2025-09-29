import matplotlib.pyplot as plt
import pandas as pd
from scipy.interpolate import UnivariateSpline
import numpy as np
import math
import os

def CFX_import(file_name = "./sample_excel.xlsx"):
    ## import excel file output from CFX software (Quantification Amplification Results)
    ## removes first column which has no data

    var = pd.read_excel(file_name)
    var = var.loc[:, ~var.columns.str.contains('^Unnamed')]

    return var

def plate_map_import():
    ## imports plate map generated from worklist software

    plate_map = pd.read_excel("plate_map.xlsx")
    plate_key = pd.read_excel("plate_key.xlsx")

    return plate_map, plate_key

def make_plots(var, column_list, cycles):

    ## trying to adapt Toan's graphing method for our purposes here
    ## variables required for plotting
    img_rows = 8
    img_cols = 12
    figx_each = 6
    figy_each = 4

    ## generate grid of plots and fill with respective curves
    fig0, axs0 = plt.subplots(img_rows, img_cols, sharex=True, sharey=True,
                              figsize=(figx_each*img_cols, figy_each*img_rows), squeeze=True)
    axs0 = axs0.flatten()

    for i, each in enumerate(column_list):
        each_title = "Well " + each
        axs0[i].plot(cycles, var[each])
        axs0[i].set_title(each_title)

    plt.savefig('test_plot.pdf')
    plt.show()

    return 1

def output_variables(var, cycles, column_list, threshold):

    ## initialize variables for each column in output dataframe
    i_1d_max = []
    cycle_1d_max = []
    value_1d_max = []
    i_2d_max = []
    cycle_2d_max = []
    value_2d_max = []
    i_2d_min = []
    cycle_2d_min = []
    value_2d_min = []
    cycle_mid_slope = []
    value_mid_slope = []
    f_min = []
    f_max = []
    delta_f = []
    plot_info = []
    CT = []

    ## create folder containing individual images with output values for each well
    os.mkdir('Individual plots')

    ## need to add in section to determine cycle at which reaction crosses RFU threshold

    for each in column_list:
        ## this code is an example with one well, will need to loop through all wells
        y_spl = UnivariateSpline(cycles, var[each], s=0, k=3)
        y_spl_2d = y_spl.derivative(n=2)
        y_spl_1d = y_spl.derivative(n=1)
        x_range = np.linspace(cycles[0], cycles[-1], 1000)
        #plt.plot(x_range, y_spl_2d(x_range))

        data = {'Cycles':x_range, '0d':y_spl(x_range), '1d':y_spl_1d(x_range), '2d':y_spl_2d(x_range)}
        df = pd.DataFrame(data)

        ## Determines first cycle at which trace passes user defined threshold value
        ## Return 'NA' if threshold is not reached. Appends to CT.
        i = 0
        cycle_threshold = 0
        while cycle_threshold == 0:
            if df.iloc[i]['0d'] >= threshold:
                cycle_threshold = x_range[i]
            elif i >= len(df)-1:
                cycle_threshold = 'NA'
            else:
                i += 1
        CT.append(cycle_threshold)

        ## calculates index position for min and max of derivatives
        i_1d_max_temp = df['1d'][df['1d'] == max(df['1d'])].index
        i_2d_max_temp = df['2d'][df['2d'] == max(df['2d'])].index
        i_2d_min_temp = df['2d'][df['2d'] == min(df['2d'])].index

        i_1d_max.append(i_1d_max_temp.item())
        i_2d_max.append(i_2d_max_temp.item())
        i_2d_min.append(i_2d_min_temp.item())

        ## calculates min and max values for raw data, first and second derivatives
        f_min_temp = min(y_spl(x_range))
        f_max_temp = max(y_spl(x_range))
        delta_f_temp = f_max_temp-f_min_temp

        f_min.append(f_min_temp)
        f_max.append(f_max_temp)
        delta_f.append(delta_f_temp)

        ## determines cycle at which min and max occur for derivatives
        cycle_1d_max.append(x_range[i_1d_max_temp].item())
        cycle_2d_max.append(x_range[i_2d_max_temp].item())
        cycle_2d_min.append(x_range[i_2d_min_temp].item())

        ## determines actual value for min and max
        value_1d_max.append(max(df['1d']))
        value_2d_max.append(max(df['2d']))
        value_2d_min.append(min(df['2d']))

        ## determines mid point for slope calculation, and calculates slope
        i_mid_slope_temp = ((i_2d_min_temp-i_2d_max_temp)/2)+i_2d_max_temp
        i_mid_up_temp = math.floor(i_mid_slope_temp.item()+2)
        i_mid_down_temp = math.floor(i_mid_slope_temp.item()-2)
        value_mid_slope_temp = (df.loc[i_mid_up_temp]['0d']-df.loc[i_mid_down_temp]['0d'])/5
        cycle_mid_slope_temp = df.loc[i_mid_slope_temp.astype(np.int64)]['Cycles']

        value_mid_slope.append(value_mid_slope_temp.item())
        cycle_mid_slope.append(cycle_mid_slope_temp.item())

        plot_ID = save_individual_plots(y_spl, x_range, each, x_range[i_2d_max_temp], x_range[i_2d_min_temp], threshold)
        plot_info.append(plot_ID)

    output_df = pd.DataFrame({'Well':column_list, 'CT':CT, 'cycle_1d_max':cycle_1d_max,
                                'value_1d_max':value_1d_max, 'cycle_2d_max':cycle_2d_max,
                                'value_2d_max':value_2d_max, 'cycle_2d_min':cycle_2d_min,
                                'value_2d_min':value_2d_min, 'cycle_mid_slope':cycle_mid_slope,
                                'value_mid_slope':value_mid_slope, 'f_min':f_min, 'f_max':f_max, 'delta_f':delta_f,
                                'plot_info':plot_info})

    output_df.to_csv('Output_data.csv', index=False)

    return output_df

def save_individual_plots(y_spl, x_range, each, c_2d_max, c_2d_min, threshold):

    cwd = os.getcwd()

    c_L = round(c_2d_max[0], 2)
    c_S = round(c_2d_min[0], 2)

    ## generate plot
    plt.figure(each)
    plt.plot(x_range, y_spl(x_range))
    plt.axvline(x=c_2d_max, label='C_liftoff', ls=':', color='r')
    plt.axvline(x=c_2d_min, label='C_slowdown', ls=':', color='m')
    plt.axhline(y=threshold, label='Threshold', ls=':', color='g')
    plt.xlabel("Cycle Number")
    plt.ylabel("RFU")
    plt.title("Well " + each + ": C_liftoff = " + str(c_L) + ", C_slowdown = " + str(c_S))
    plt.legend(bbox_to_anchor=(1.0, 1), loc='upper left')

    ## save plot in desired directory file
    ## need to add if statement for error handling in case folder already exists
    fig_path = os.path.join(cwd, 'Individual plots')
    fig_info = fig_path + "\\" + each + '.png'
    plt.savefig(fig_info, bbox_inches='tight')

    plt.close()

    return fig_info