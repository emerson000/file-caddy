#!/usr/bin/env python3

import os
import json
import sys

from file import File
from filetype import FileType


def main(root_directory):
    tree = get_file_tree(root_directory)
    tree_json = get_tree_json(tree)
    write_json_to_file(tree_json, './public/files.json')
    exit_program(0)


def get_file_tree(root_directory):
    output = []
    for root, dirs, files in os.walk(root_directory):
        print(f'{root}')
        if root == root_directory:
            output.append(get_file(root, FileType.FOLDER))
        folders_arr = get_files(dirs, FileType.FOLDER, root)
        output = merge_arrays(output, folders_arr)
        files_arr = get_files(files, FileType.FILE, root)
        output = merge_arrays(output, files_arr)
    return output


def get_file(file, filetype, parent=None):
    new_file = File()
    new_file.set_filetype(filetype)
    new_file.set_filename(file)
    new_file.set_parent(parent)
    if filetype == FileType.FILE:
        if parent is None:
            path = file
        else:
            path = os.path.join(parent, file)
        if os.path.exists(path):
            new_file.set_size(os.path.getsize(path))

    return new_file


def get_files(files, filetype, parent=None):
    output = []
    for file in files:
        output.append(get_file(file, filetype, parent))
    return output


def merge_arrays(arr1, arr2):
    return [*arr1, *arr2]


def get_tree_json(tree):
    output = []
    for obj in tree:
        output.append(obj.toDict())
    return json.dumps(output)


def write_json_to_file(json, filename):
    file = open(filename, 'w')
    file.write(json)
    file.close()


def print_banner():
    print("""
8888888888 d8b 888           .d8888b.                888      888
888        Y8P 888          d88P  Y88b               888      888
888            888          888    888               888      888
8888888    888 888  .d88b.  888         8888b.   .d88888  .d88888 888  888
888        888 888 d8P  Y8b 888            "88b d88" 888 d88" 888 888  888
888        888 888 88888888 888    888 .d888888 888  888 888  888 888  888
888        888 888 Y8b.     Y88b  d88P 888  888 Y88b 888 Y88b 888 Y88b 888
888        888 888  "Y8888   "Y8888P"  "Y888888  "Y88888  "Y88888  "Y88888
                                                                       888
                                                                  Y8b d88P
                                                                   "Y88P"
""")


def exit_program(code):
    print()
    exit(code)


if __name__ == '__main__':
    print_banner()
    args = sys.argv
    if len(args) != 2:
        print(f'Usage: python3 {args[0]} <root_directory>', file=sys.stderr)
        exit_program(1)
    main(args[1])
