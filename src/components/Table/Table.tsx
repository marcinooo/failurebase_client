import React from 'react'
import './Table.css'
import ChevronThinUp from '../../assets/svg/chevron-thin-up.svg'
import ChevronRight from '../../assets/svg/chevron-right.svg'
import ChevronLeft from '../../assets/svg/chevron-left.svg'

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
  NULL = 'null'
}

interface Cell {
  id: string
  label: string
  order?: Order
}

export interface Row {
  id: string
  data: Cell[]
}

interface TableProps {
  header: Cell[]
  data: Row[]
  selectedItemsInfo: string
  pageInfo: string
  secectedItems: string[]
  selectAllChecked: boolean
  nextPageDisabled: boolean
  prevPageDisabled: boolean
  onSortClick: (id: string, order: Order) => void
  onSelectAllChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSelectOneChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onNextPageClick: (event: React.MouseEvent<HTMLElement>) => void
  onPrevPageClick: (event: React.MouseEvent<HTMLElement>) => void
  onSelectedItemsClearClick: (event: React.MouseEvent<HTMLElement>) => void
}

const Table: React.FC<TableProps> = ({
  header,
  data,
  selectedItemsInfo,
  pageInfo,
  secectedItems,
  selectAllChecked,
  nextPageDisabled,
  prevPageDisabled,
  onSortClick,
  onSelectAllChange,
  onSelectOneChange,
  onNextPageClick,
  onPrevPageClick,
  onSelectedItemsClearClick
}) => {
  const handleSortingButtonClick = (event: React.MouseEvent<HTMLElement>): void => {
    const classList: DOMTokenList = event.currentTarget.classList
    if (classList.contains('rotated-up')) {
      classList.replace('rotated-up', 'rotated-down')
      onSortClick(event.currentTarget.id, Order.DESC)
    } else {
      classList.replace('rotated-down', 'rotated-up')
      onSortClick(event.currentTarget.id, Order.ASC)
    }
  }

  return (
    <>
      <div className="fb-table">
        <table>

          {/* TABLE HEAD */}

          <thead>
            <tr>
              <th>
                <input
                  id="selectAll"
                  name="checkbox"
                  type="checkbox"
                  onChange={(e) => { onSelectAllChange(e) }}
                  checked={selectAllChecked}
                />
              </th>
              {header.map((thItem, i) =>
                <th key={i}>
                  {thItem.label}
                  {(thItem?.order === Order.ASC)
                    ? (
                    <button
                      id={thItem.id}
                      className="sort-button rotated-up"
                      onClick={handleSortingButtonClick}
                    >
                      <img src={ChevronThinUp} alt="Sort SVG" />
                    </button>
                      )
                    : (
                        thItem.order === Order.DESC
                      )
                        ? (
                    <button
                      id={thItem.id}
                      className="sort-button rotated-down"
                      onClick={handleSortingButtonClick}
                    >
                      <img src={ChevronThinUp} alt="Sort SVG"/>
                    </button>
                          )
                        : (
                    <></>
                          )}
                </th>
              )}
            </tr>
          </thead>

          {/* TABLE BODY */}

          <tbody>
            {data.map((row, i) =>
              <tr key={i}>
                <td>
                  <input
                    id={row.id}
                    className="event-checkbox"
                    name="checkbox"
                    type="checkbox"
                    onChange={(e) => { onSelectOneChange(e) }}
                    checked={secectedItems.includes(row.id)}
                  />
                </td>
                {row.data.map((cell, j) =>
                  <td key={j}>
                    {cell.label}
                  </td>
                )}
              </tr>
            )}
          </tbody>

          {/* TABLE FOOT */}

          <tfoot>
            <tr>
              <th colSpan={6}>
                <span className="foot-left">
                  {(selectedItemsInfo !== '')
                    ? (<>{selectedItemsInfo} (
                        <a
                          className="table-selected-items-clear"
                          onClick={(e) => { onSelectedItemsClearClick(e) }}
                        >
                          clear
                        </a>
                      )</>)
                    : ('')}
                </span>
                <span className="foot-right">
                  <span>{pageInfo}</span>
                  <button
                    className="paginate-button"
                    onClick={(e) => { onPrevPageClick(e) }}
                    disabled={prevPageDisabled}
                  >
                    <img src={ChevronLeft} alt="Sort SVG" />
                  </button>
                  <button
                    className="paginate-button"
                    onClick={(e) => { onNextPageClick(e) }}
                    disabled={nextPageDisabled}
                  >
                    <img src={ChevronRight} alt="Sort SVG" />
                  </button>
                </span>
              </th>
            </tr>
          </tfoot>

        </table>
      </div>
    </>
  )
}

export default Table
