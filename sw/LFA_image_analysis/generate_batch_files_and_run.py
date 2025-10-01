import os
import multiprocessing as mp
import pandas as pd


def run_batchfile(each_file):
    """
    Executes a batch file using the os.system command.

    :param each_file: Path to the batch file to be executed.
    :return: Always returns 1.
    """
    os.system(each_file)
    return 1


def get_each_df(each_dir):
    """
    Reads a CSV file named 'image.csv' from the specified directory and adds a 'group' column
    with the name of the directory.

    :param each_dir: Path to the directory containing the 'image.csv' file.
    :return: A pandas DataFrame with the contents of 'image.csv' and an additional 'group' column.
    """
    each_df = pd.read_csv(os.path.join(each_dir, 'image.csv'))
    each_df['group'] = os.path.basename(each_dir)
    return each_df

# Dictionary containing JSON strings for different image processing parameters
para_texts = {
     'line_darkframe': "{\"row0\":608, \"row1\":978, \"col0\":450, \"col1\":1700, \"median_blur_size\":7, \"sobel_size\":11, \"dark_frame\":1, \"gblur_size\":30, \"crop_right_extra\":1, \"row_offset\":20, \"col_offset\":260, \"border\":[500, 800], \"color_channel\":[\"gray\", \"gray\"], \"signal_type\":[\"line\", \"line\"], \"do_detrend\":1, \"ndetrend\":5, \"nsignal\":3, \"nblur\":400, \"top_fraction\":0.05, \"contour_mode\":1, \"contour_method\":2, \"rect_height\":10, \"edge_gap\":40}",
     'line_lightframe':  "{\"row0\":608, \"row1\":900, \"col0\":680, \"col1\":1500, \"median_blur_size\":7, \"sobel_size\":5, \"dark_frame\":0, \"gblur_size\":30, \"crop_right_extra\":1, \"row_offset\":40, \"col_offset\":30, \"border\":[190, 465], \"color_channel\":[\"red\", \"red\"], \"signal_type\":[\"line\", \"line\"], \"do_detrend\":1, \"ndetrend\":5, \"nsignal\":3, \"nblur\":400, \"top_fraction\":0.05, \"contour_mode\":1, \"contour_method\":2, \"rect_height\":10, \"edge_gap\":40}",
     'spot_darkframe': "{\"row0\":644, \"row1\":924, \"col0\":840, \"col1\":1380, \"median_blur_size\":7, \"sobel_size\":5, \"dark_frame\":1, \"gblur_size\":10, \"crop_right_extra\":0, \"row_offset\":40, \"col_offset\":30, \"border\":[300], \"color_channel\":[\"gray\"], \"signal_type\":[\"spot\"], \"do_detrend\":1, \"ndetrend\":5, \"nsignal\":3, \"nblur\":400, \"top_fraction\":0.05, \"contour_mode\":1, \"contour_method\":2, \"rect_height\":10, \"edge_gap\":40}",
}

if __name__ == '__main__':
    # Define the type of analysis to be performed
    type_of_analysis = 'line_lightframe'
    para_text = para_texts[type_of_analysis]

    # Find subdirectories in the current directory
    dir = [each[0] for each in os.walk('.')]
    dir = dir[1:]  # eliminate the first one, which is '.'
    dir = [each for each in dir if ('.idea' not in each and '__pycache__' not in each
                                    and '.git' not in each and '.ipynb_checkpoints' not in each)]

    # Create the batch files for each subdirectory
    file = [os.path.basename(each) + '.bat' for each in dir]
    for each_dir, each_file in zip(dir, file):
        out_string = 'python "Hamilton_image_analysis.py" ' + '"' + each_dir + '" "' + para_text.replace('"',
                                                                                                         '\\"') + '"\n'
        out_file = open(each_file, 'w')
        out_file.write(out_string)
        out_file.close()

    # Run batch files using multiprocessing
    pool = mp.Pool(mp.cpu_count())
    pool.map(run_batchfile, file)
    pool.close()
    pool.join()

    # Compile all data from the subdirectories
    df = pd.concat([get_each_df(each_dir) for each_dir in dir])
    df['guid'] = df['filename'].str.split('_', n=1, expand=True).iloc[:,0].astype(int)
    df.to_csv('all_results.csv', index=False)

