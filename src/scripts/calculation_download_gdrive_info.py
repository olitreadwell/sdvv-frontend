#!/usr/bin/env python3
"""
Reads and updates the candidate JSON files from the candidate spreadsheet.

Reads the information from the speadsheet (https://docs.google.com/spreadsheets/d/1mENueYg0PhXE_MA9AypWWBJvBLdY03b8H_N_aIW-Ohw/)
and generates or updates the candidate JSON files. This updates the:
candidate name,
first name,
last name,
description,
website,
in general,
and commitee name fields.
"""
import json
import math
import os
import typing

from shared_calculations import DIRECTORY, GOOGLE_SHEET_URL, read_candidate_csv

EMPTY_MODEL_JSON = {
    "candidate name": "",
    "description": "",
    "website": "",
    "raised vs spent": [
        {"Raised": "0", "Spent": "0", "Donors": "0", "Average Donor": "0"}
    ],
    "by industry": [
        {
            "industry 1": ["", "0", "0"],
            "industry 2": ["", "0", "0"],
            "industry 3": ["", "0", "0"],
            "industry 4": ["", "0", "0"],
            "industry 5": ["", "0", "0"],
        }
    ],
    "in vs out district": [{"in": "0", "out": "0"}],
    "oppose": "0",
    "support": "0",
    "committee name": "",
    "first": "",
    "last": "",
    "in general": False,
}


def replace_nan(value, replace):
    """Returns the value if the value is not NaN, else returns replace."""
    try:
        if math.isnan(value):
            return replace
    except TypeError:
        pass
    return value


def normalize(string, nan_replacement=None):
    """
    Normalizes strings by replacing spaces with underscores and lowercases it.

    If nan_replacement is not None, NaN values are replaced with it.

    :param string: A str to be normalized.
    :param nan_replacement: The optional value NaN values are replaced with.
    :returns: The string or the nan_replacement
    """
    try:
        if nan_replacement is not None and math.isnan(string):
            return nan_replacement
    except TypeError:
        pass
    return string.replace(" ", "_").lower()


class JsonFilesNT(typing.NamedTuple):
    """
    Named tuple that contains the contents of a JSON file and the file's path

    The contents field is not guaranteed to equal the actual contents of the file path.
    The file path is also not guaranteed to exist.
    """

    contents: dict
    path: str


def generate_json_files(base_directory, candidate_df):
    """
    Creates empty candidate JSON files in a folder.

    :param base_directory: The str path of the directory all the files
    and folders will be generated in.
    :param candidate_df: The Pandas Dataframe the data will be taken from.
    :returns: A dictionary with the candidate name as the key and the
    value being the corrosponding JsonFilesNT.
    """
    files = {}
    for candidate in candidate_df.index:
        office_folder = normalize(candidate_df.loc[candidate]["Office"], "other")
        council_folder = (
            f"district_{candidate_df.loc[candidate]['District']}"
            if replace_nan(candidate_df.loc[candidate]["District"], False)
            else ""
        )
        name = normalize(candidate)
        year = replace_nan(candidate_df.loc[candidate]["Year"], "other")
        dir_path = f"{base_directory}/{year}/{office_folder}/{council_folder}/{name}/"
        os.makedirs(dir_path, exist_ok=True)
        json_path = f"{dir_path}{name}.json"
        try:
            file = open(json_path)
        except FileNotFoundError:
            json_dict = EMPTY_MODEL_JSON.copy()
        else:
            with file as f:
                # Merges the dictionaries
                json_dict = {**EMPTY_MODEL_JSON, **json.load(f)}
        files[candidate] = JsonFilesNT(json_dict, json_path)

    return files


def update_json_files(folder_path, csv_url):
    """
    Generates and updates candidate JSON files in a folder.

    :param folder_path: The str path of the folder the JSON files will be in.
    :param csv_url: The str url of the CSV file that the data will be taken from.
    :returns: None
    """
    csv_df = read_candidate_csv(csv_url)
    files = generate_json_files(folder_path, csv_df)
    for candidate in csv_df.index:
        json_dict, path = files[candidate]
        json_dict["candidate name"] = candidate
        json_dict["first"] = candidate.split(" ")[0]
        json_dict["last"] = candidate.split(" ")[-1]
        json_dict["description"] = replace_nan(csv_df.loc[candidate]["Description"], "")
        json_dict["website"] = replace_nan(csv_df.loc[candidate]["Website"], "")
        json_dict["committee name"] = replace_nan(
            csv_df.loc[candidate]["Committee Name (Filer_Name)"], ""
        )

        json_dict["in general"] = (
            replace_nan(csv_df.loc[candidate]["In General"], "").lower() == "yes"
        )

        with open(path, "w") as f:
            json.dump(json_dict, f, indent=2)
            f.write("\n")


if __name__ == "__main__":
    update_json_files(
        DIRECTORY, GOOGLE_SHEET_URL,
    )
