import os
import json
import requests
from typing import List, Dict


class DataFetcher:
    def __init__(
        self,
        api_url: str,
        target_rows: int = 1000,
        folder_name: str = "../avatars",
        json_filename: str = "../data/data.json",
    ):
        """
        Initializes the DataFetcher class.

        :param api_url: The API URL to fetch data from.
        :param target_rows: The number of unique items to collect.
        :param folder_name: The name of the folder to store downloaded images.
        :param json_filename: The name of the JSON file to save collected data.
        """
        self.api_url = api_url
        self.target_rows = target_rows
        self.folder_name = folder_name
        self.json_filename = json_filename

    def fetch_unique_items(self) -> List[Dict]:
        """
        Fetches unique items from the API and saves them in a list.

        :return: A list of unique items.
        """
        collected_items = []
        seen_uuids = set()

        while len(collected_items) < self.target_rows:
            response = requests.get(self.api_url, params={"results": 100})
            if response.status_code != 200:
                print(
                    f"Error: Unable to fetch data. Status Code {response.status_code}"
                )
                continue

            data = response.json().get("results", [])
            for item in data:
                uuid = item["login"]["uuid"]
                if uuid not in seen_uuids:
                    seen_uuids.add(uuid)
                    collected_items.append(item)
                    if len(collected_items) >= self.target_rows:
                        break

            print(f"Collected {len(collected_items)} unique items so far...")

        return collected_items

    def save_to_json_file(self, data: List[Dict]) -> None:
        """
        Saves data to a JSON file.

        :param data: The data to save.
        """
        with open(self.json_filename, "w") as f:
            json.dump(data, f, indent=4)
        print(f"Data saved to {self.json_filename}")

    def create_folder(self) -> None:
        """
        Creates a folder if it doesn't exist.
        """
        if not os.path.exists(self.folder_name):
            os.makedirs(self.folder_name)
            print(f"Folder '{self.folder_name}' created.")
        else:
            print(f"Folder '{self.folder_name}' already exists.")

    def download_images(self) -> None:
        """
        Downloads images based on the collected JSON data.
        """
        try:
            with open(self.json_filename, "r") as f:
                items = json.load(f)
        except FileNotFoundError:
            print(f"Error: The file '{self.json_filename}' does not exist.")
            return
        except json.JSONDecodeError:
            print("Error: Failed to decode JSON file.")
            return

        self.create_folder()

        for index, item in enumerate(items):
            try:
                img_url = item["picture"]["large"]
                img_filename = os.path.join(
                    self.folder_name, f"{item['login']['uuid']}.jpg"
                )

                response = requests.get(img_url)
                if response.status_code == 200:
                    with open(img_filename, "wb") as img_file:
                        img_file.write(response.content)
                    print(f"Downloaded: {img_filename}")
                else:
                    print(f"Failed to download image for item {item['login']['uuid']}")
            except KeyError as e:
                print(f"Skipping item {index} due to missing key: {e}")
            except Exception as e:
                print(f"An error occurred: {e}")

    def run(self) -> None:
        print("Starting data fetch...")
        data = self.fetch_unique_items()
        print("Saving data to JSON...")
        self.save_to_json_file(data)
        print("Downloading images...")
        self.download_images()
        print("Process complete!")
