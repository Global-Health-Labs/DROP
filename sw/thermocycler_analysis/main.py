from data_process import *

## import excel files containing relevant data
var = CFX_import()
plate_info = plate_map_import()

## assign plate map and plate key variables, use key to identify well information
plate_map = plate_info[0]
plate_key = plate_info[1]

## user defined threshold to determine "CT"
#threshold = 10000
threshold_str = input("Enter threshold value (recommendation 5,000-25,000): ")
threshold = int(threshold_str)

cycles = list(var['Cycle'])
column_list = list(var.columns)
column_list.remove('Cycle')
var = var.drop('Cycle', 1)

output_df = output_variables(var, cycles, column_list, threshold)
plot_vars = make_plots(var, column_list, cycles)
