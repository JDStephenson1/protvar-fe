import { useState } from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import HomePage from './pages/home/HomePage';
import SearchResultsPage from './pages/search/SearchResultPage';
import APIErrorPage from './pages/APIErrorPage';
import { API_URL } from '../constants/const';
import MappingResponse, { ParsedInput } from '../types/MappingResponse';
import { convertApiMappingToTableRecords, MappingRecord } from '../utills/Convertor';
import { firstPage, Page } from '../utills/AppHelper';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { ABOUT, API_ERROR, CONTACT, HOME, SEARCH } from '../constants/BrowserPaths';

interface AppProps extends RouteComponentProps { }

function App(props: AppProps) {
  const [loading, setLoading] = useState(false)
  const [userInputs, setUserInputs] = useState<string[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [searchResults, setSearchResults] = useState<MappingRecord[][][]>([])
  const [invalidInputs, setInvalidInputs] = useState<Array<ParsedInput>>([])
  const [page, setPage] = useState<Page>(firstPage(0))

  const fetchPage = (page: Page) => {
    setLoading(true)
    if (file) {
      fetchFromFile(page, file);
    } else if (userInputs) {
      handleSearch(page, userInputs);
    }
  }

  function fetchPasteResult(userInputString: string) {
    const userInputs = userInputString.split('\n');
    setUserInputs(userInputs)
    setLoading(true)
    handleSearch(firstPage(userInputs.length), userInputs);
  }

  const handleSearch = (page: Page, inputArr: string[]) => {
    const PAGE_SIZE = page.itemsPerPage;
    var skipRecord = (page.currentPage - 1) * PAGE_SIZE;
    if (inputArr.length <= skipRecord)
      return

    var inputSubArray = [];
    const isNextPage = inputArr.length > skipRecord + PAGE_SIZE;
    if (isNextPage) {
      inputSubArray = inputArr.slice(skipRecord, skipRecord + PAGE_SIZE);
    } else {
      inputSubArray = inputArr.slice(skipRecord);
    }

    setPage({ ...page, nextPage: isNextPage })
    mappingApiCall(inputSubArray);
  };

  function fetchFileResult(file: File) {
    setLoading(true)
    setFile(file)
    file.text()
      .then(text => fetchFromFile(firstPage(text.split('\n').length), file))
  }

  const fetchFromFile = (page: Page, uploadedFile: File) => {
    const pageSize = page.itemsPerPage;
    const skipRecord = (page.currentPage - 1) * pageSize;

    uploadedFile.text()
      .then(text => text.split('\n'))
      .then(lines => {
        let count = 0, recordsProcessed = 0;
        const inputText: string[] = [];
        for (const newInput of lines) {
          if (recordsProcessed >= pageSize) {
            break;
          }
          if (count > skipRecord && newInput.length > 0 && !newInput.startsWith('#')) {
            recordsProcessed++;
            inputText.push(newInput);
          } else {
            count++;
          }
        }
        setPage({ ...page, nextPage: recordsProcessed >= pageSize })
        return inputText;
      }).then(inputs => mappingApiCall(inputs))
  };

  function mappingApiCall(inputSubArray: string[]) {
    const uri = `${API_URL}/variant/mapping`;
    const headers = { 'Content-Type': 'application/json', Accept: '*' };

    axios.post<MappingResponse>(uri, inputSubArray, { headers: headers })
      .then((response) => {
        const records = response.data.mappings.map(convertApiMappingToTableRecords);
        setSearchResults(records)
        setInvalidInputs(response.data.invalidInputs)
        props.history.push(SEARCH);
      })
      .catch((err) => {
        props.history.push(API_ERROR);
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  return <>
    <Route path={HOME} exact render={() => <HomePage loading={loading} fetchPasteResult={fetchPasteResult} fetchFileResult={fetchFileResult} />} />
    <Route path={SEARCH} render={() => <SearchResultsPage rows={searchResults} file={file} page={page} pastedInputs={userInputs}
      fetchNextPage={fetchPage} invalidInputs={invalidInputs} />} />
    <Route path={API_ERROR} render={() => <APIErrorPage />} />
    <Route path={ABOUT} render={() => <AboutPage />} />
    <Route path={CONTACT} render={() => <ContactPage />} />
  </>
}

export default withRouter(App);