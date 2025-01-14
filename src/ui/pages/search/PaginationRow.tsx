import Button from '../../elements/form/Button';
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import { NextPageFun, Page } from "../../../utills/AppHelper";

interface PaginationRowProps {
  page: Page
  fetchNextPage: NextPageFun
  loading: boolean
}

function PaginationRow(props: PaginationRowProps) {
  const { page, fetchNextPage, loading } = props;
  const totalPages = Math.ceil(page.totalItems / page.itemsPerPage);

  function changePageSize(pageSize: any) {
    if (pageSize !== page.itemsPerPage) {
      page.currentPage = 1
      page.itemsPerPage = pageSize
      fetchNextPage(page);
    }
  }

  const fetchPage = (direction: number) => {
    page.currentPage = page.currentPage + direction;
    fetchNextPage(page);
  };

  return <table className="table-header">
    <tbody>
      <tr>
        <td>
          <Button onClick={() => fetchPage(-1)} loading={loading} disabled={page === undefined || page.currentPage === 1}>&laquo; Previous</Button>
        </td>
        <td>
          {page.currentPage} of {totalPages}
        </td>
        <td>
          <Button onClick={() => fetchPage(1)} loading={loading} disabled={page === undefined || !page.nextPage}>Next &raquo;</Button>
        </td>
        <td>
          <Dropdown
            placeholder="Pages"
            options={[25, 50, 100]}
            value={page.itemsPerPage}
            onChange={(option) => changePageSize(option.value)}
          />
        </td>
      </tr>
    </tbody>
  </table>
}
export default PaginationRow;