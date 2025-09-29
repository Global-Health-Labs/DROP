from backend import *
import json
import argparse

# Set up argument parser
parser = argparse.ArgumentParser()
parser.add_argument('input_folder', help='input folder containing images')
parser.add_argument('parameters', help='parameters for image analysis')
args = parser.parse_args()

# Print parsed arguments
print(args)

# Load parameters from JSON string
para = json.loads(args.parameters)

# Define a method to process an image using the parameters
def method(image):
    return process_image(image, **para)

# Process all images in the input folder using the defined method
process_folder(args.input_folder, method, 'image')

