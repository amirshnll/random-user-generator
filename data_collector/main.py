from fetcher import DataFetcher

if __name__ == "__main__":
    api_url = "https://randomuser.me/api/"
    fetcher = DataFetcher(api_url=api_url, target_rows=2000)
    fetcher.run()
