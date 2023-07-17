import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Filter from '../../assets/svg/filter.svg'
import Delete from '../../assets/svg/delete.svg'
import { useMainContext } from '../../store/MainStore'
import Table, { Order, type Row } from '../../components/Table/Table'
import RoundButton from '../../components/RoundButton/RoundButton'
import ButtonBadge from '../../components/ButtonBadge/ButtonBadge'
import Modal, { openModal, closeModal } from '../../components/Modal/Modal'
import ModalHeader from '../../components/Modal/ModalHeader'
import ModalBody from '../../components/Modal/ModalBody'
import ModalFooter from '../../components/Modal/ModalFooter'
import Collapsible, { openCollapsible, closeCollapsible } from '../../components/Collapsible/Collapsible'
import TestService from '../../services/TestService'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import InfoBadge from '../../components/InfoBadge/InfoBadge'
import { dumpDate, longText } from '../../utils/functions'
import './TestsPage.css'

interface Test {
  id: number
  uid: string
  file: string
  marks: string[]
  total_events_count: number
};

const createRow = (test: Test): Row => {
  const row = {
    id: test.id.toString(),
    data: [
      { id: 'uid', label: longText(test.uid, 100) },
      { id: 'file', label: longText(test.file, 100) },
      { id: 'total_events_count', label: test.total_events_count.toString() },
      { id: 'test-marks', label: test.marks.join(', ') }
    ]
  }
  return row
}

const header = [
  {
    id: 'uid-collumn',
    label: 'UID',
    order: Order.ASC
  },
  {
    id: 'file-collumn',
    label: 'File',
    order: Order.DESC
  },
  {
    id: 'total-events-count-collumn',
    label: 'Events Count',
    order: Order.ASC
  },
  {
    id: 'marks-collumn',
    label: 'Marks',
    order: Order.NULL
  }
]

const TestsPage: React.FC = () => {
  const navigate = useNavigate()
  const { setLoading, selectedTests, setSelectedTests } = useMainContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterParams, setFilterParams] = useState<Record<string, any>>({})
  const [numberOfFilterParams, setNumberOfFilterParams] = useState<number>(0)
  const [tests, setTests] = useState<Row[]>([])
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [nextPage, setNextPage] = useState<boolean>(false)
  const [prevPage, setPrevPage] = useState<boolean>(false)
  const [count, setCount] = useState<number>(0)
  const [pageLimit, setPageLimit] = useState<number>(0)
  const [areSelectedAll, setAreSelectedAll] = useState<boolean>(false)
  const [deletionStatus, setDeletionStatus] = useState<string>('')

  const fetchTests = (): void => {
    setLoading(true)

    TestService.getAll(searchParams)
      .then((response) => {
        const tests = response.items.map((test: Test) => createRow(test))
        const filterInputs = document.querySelectorAll<HTMLInputElement>('#filter-modal input')
        const newFilterParams: Record<string, any> = {}

        filterInputs.forEach((item: HTMLInputElement) => {
          const paramName: string = item.id.split('-').slice(1, -1).join('_') ?? ''
          const valueToSet: string[] = searchParams.getAll(paramName)

          if (valueToSet.length > 0) {
            if (paramName.includes('timestamp')) {
              newFilterParams[paramName] = dumpDate(new Date(valueToSet[0]))
            } else if (paramName.includes('mark')) {
              newFilterParams.marks = valueToSet
            } else {
              newFilterParams[paramName] = valueToSet[0]
            }
          }
        })

        const newAreSelectedAll = selectedTests.length !== 0 && (
          tests.filter((item: Row) => selectedTests.includes(item.id)).length === tests.length
        )

        setTests(tests)
        setPageNumber(response.page_number)
        setPrevPage(response.prev_page)
        setNextPage(response.next_page)
        setCount(response.count)
        setPageLimit(response.page_limit)
        setAreSelectedAll(newAreSelectedAll)
        setFilterParams(newFilterParams)
        setLoading(false)
      })
      .catch((e) => {
        console.log(e)
        setLoading(false)
      })
  }

  useEffect(fetchTests, [window.location.href])

  useEffect(() => {
    setNumberOfFilterParams(Object.keys(filterParams).length)
  }, [filterParams])

  const onSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAreSelectedAll(!areSelectedAll)
    if (areSelectedAll) {
      const testsOnCurrentPage = tests.map(item => item.id)
      const newSelectedTests = selectedTests.filter(item => !testsOnCurrentPage.includes(item))
      setSelectedTests(newSelectedTests)
    } else {
      const testsOnCurrentPageToAdd = tests.filter(item => !selectedTests.includes(item.id)).map(item => item.id)
      const newSelectedTests: string[] = [...selectedTests, ...testsOnCurrentPageToAdd]
      setSelectedTests(newSelectedTests)
    }
  }

  const onSelectOneChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, checked } = event.target
    const newSelectedTests = checked ? [...selectedTests, id] : selectedTests.filter(item => item !== id)
    const newAreSelectedAll = tests.filter(item => newSelectedTests.includes(item.id)).length === tests.length
    setAreSelectedAll(newAreSelectedAll)
    setSelectedTests(newSelectedTests)
  }

  const handleSorting = (id: string, order: Order): void => {
    const orderPropertyName = id.replace('-collumn', '').replaceAll('-', '_')
    const value = `${order === Order.DESC ? '-' : ''}${orderPropertyName}`
    searchParams.set('ordering', value)
    setSearchParams(searchParams)
    navigate({ pathname: '/tests', search: '?' + String(searchParams) })
  }

  /**
   * Open filter modal
   */
  const handleFilterButtonClick = (event: React.MouseEvent<HTMLElement>): void => {
    openModal('filter-modal')
    // Fill filter inputs
    const filterInputs = document.querySelectorAll<HTMLInputElement>('#filter-modal input')
    filterInputs.forEach((item: HTMLInputElement) => {
      const valueToSet: string = searchParams.get(item.id.split('-').slice(1, -1).join('_')) ?? ''
      if (valueToSet !== '') {
        if (item.id.includes('timestamp')) {
          item.value = dumpDate(new Date(valueToSet))
        } else if (item.id.includes('mark')) {
          item.value = ''
        } else {
          item.value = valueToSet
        }
      }
    })
  }

  /**
   * Send filter query
   */
  const handleFilterModalConfirmButtonClick = (event: React.MouseEvent<HTMLElement>): void => {
    // Redirect with added filters
    for (const [key, val] of Object.entries(filterParams)) {
      if (key === 'marks') {
        searchParams.delete('mark')
        for (let i = 0; i < val.length; i++) {
          searchParams.append('mark', String(val[i]))
        }
      } else {
        searchParams.set(key, String(val))
      }
    }
    searchParams.delete('page')
    setSearchParams(searchParams)
    setSelectedTests([])
    setAreSelectedAll(false)
    closeModal('filter-modal')
  }

  /**
   * Clear fields
   */
  const handleFilterModalClearButtonClick = (event: React.MouseEvent<HTMLElement>): void => {
    const filterInputs = document.querySelectorAll<HTMLInputElement>('#filter-modal input')
    filterInputs.forEach((item: HTMLInputElement) => {
      item.value = ''
      searchParams.delete(item.id.split('-').slice(1, -1).join('_'))
    })
    setFilterParams({})
    setSearchParams(searchParams)
  }

  const handleFilterInputFiled = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const queryParamName: string = event.target.id.split('-').slice(1, -1).join('_')
    const value = queryParamName.includes('timestamp') ? dumpDate(new Date(event.target.value)) : event.target.value
    if (event.target.value === '' && queryParamName in filterParams) {
      const { [queryParamName]: _, ...rest } = filterParams
      setFilterParams(rest)
    } else {
      setFilterParams({ ...filterParams, [queryParamName]: value })
    }
  }

  const onAddMarksButtonClick = (event: React.MouseEvent<HTMLElement>): void => {
    const marksInput = document.querySelector('#filter-mark-input') as HTMLInputElement
    if (marksInput !== null) {
      const newFilterParams = { ...filterParams }
      if (
        marksInput.value !== '' &&
        (newFilterParams.marks === undefined || newFilterParams.marks.indexOf(marksInput.value) === -1)
      ) {
        newFilterParams.marks = [...(newFilterParams.marks ?? []), marksInput.value]
      }
      marksInput.value = ''
      setFilterParams(newFilterParams)
    }
  }

  const onCloseMarkButtonClick = (event: React.MouseEvent<HTMLElement>): void => {
    if ('marks' in filterParams) {
      const newFilterParams = { ...filterParams }
      newFilterParams.marks = filterParams.marks.filter(
        (item: string) => item !== event.currentTarget.parentNode?.textContent
      )
      setFilterParams(newFilterParams)
    }
  }

  const handleDeleteButtonClick = (event: React.MouseEvent<HTMLElement>): void => {
    openModal('delete-modal')
  }

  const handleDeleteModalConfirmButtonClick = (event: React.MouseEvent<HTMLElement>): void => {
    if (selectedTests.length !== 0) {
      openCollapsible('deletion-in-progress')
      TestService.deleteGiven(selectedTests)
        .then((response) => {
          const successes: string[] = []
          const failures: string[] = []
          response.statuses.forEach((item: any) => {
            if (item.status === 200) {
              successes.push(String(item.id))
            } else {
              failures.push(String(item.id))
            }
          })
          const summary = failures.length === 0
            ? 'All tests deleted successfully'
            : `${successes.length} tests deleted successfully, the rest no longer exist in database.`
          setDeletionStatus(summary) // change name to summary
          setSelectedTests([])
          setTimeout(() => {
            closeCollapsible('deletion-in-progress')
            openCollapsible('deletion-done')
          }, 1000)
        })
        .catch((error) => {
          setDeletionStatus('Deletion error')
          setTimeout(() => {
            closeCollapsible('deletion-in-progress')
            openCollapsible('deletion-done')
          }, 1000)
          console.log(`Error details: ${String(error?.response?.detail ?? 'no details ')}`)
        })
    }
  }

  const onDeleteModalCloseButtonClick = (event: React.MouseEvent<HTMLElement>): void => {
    setDeletionStatus('')
    closeCollapsible('deletion-done')
    closeModal('delete-modal')
    if (deletionStatus !== '') { fetchTests() }
  }

  const handleUnselectButtonClick = (event: React.MouseEvent<HTMLElement>): void => {
    openModal('unselect-modal')
  }

  const onUnselectModalConfirmButtonClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAreSelectedAll(false)
    setSelectedTests([])
    closeModal('unselect-modal')
  }

  const onNextPageClick = (event: React.MouseEvent<HTMLElement>): void => {
    searchParams.set('page', String(pageNumber + 1))
    setSearchParams(searchParams)
  }

  const onPrevPageClick = (event: React.MouseEvent<HTMLElement>): void => {
    searchParams.set('page', String(pageNumber - 1))
    setSearchParams(searchParams)
  }

  return (
    <>
      <div className="filters">
        <div className="row">
          <div className="col filter-button">
            <span className="brand">Tests</span>
            <RoundButton onClick={handleFilterButtonClick}>
              <img src={Filter} alt="Filter SVG" />
              {numberOfFilterParams > 0 && (
                <ButtonBadge text={numberOfFilterParams} />
              )}
            </RoundButton>
            <RoundButton onClick={handleDeleteButtonClick}>
              <img src={Delete} alt="Delete SVG" />
            </RoundButton>
          </div>
        </div>

        {/* Filter modal */}

        <Modal id="filter-modal">
          <ModalHeader>
            <span className="text-primary">Filter tests</span>
          </ModalHeader>
          <ModalBody>
            <p>
              <label htmlFor="filter-uid-input">UID</label>
              <input id="filter-uid-input"
                type="text"
                placeholder="Type phrase to search"
                onChange={handleFilterInputFiled}
              />
            </p>
            <p>
              <label htmlFor="filter-file-input">File</label>
              <input id="filter-file-input"
                type="text"
                placeholder="Type phrase to search"
                onChange={handleFilterInputFiled}
              />
            </p>
            <p>
              <label htmlFor="filter-mark-input">Mark</label>
              <span className="grouped">
                <input id="filter-mark-input"
                  type="text"
                  placeholder="Type mark to search"
                />
                <button id="addMark" className="button" onClick={ onAddMarksButtonClick }>Add</button>
              </span>
              <span>
                {filterParams?.marks?.map((item: string, id: number) =>
                  <InfoBadge key={id} text={item} onClose={onCloseMarkButtonClick}/>
                )}
              </span>
            </p>
          </ModalBody>
          <ModalFooter>
            <button className="button primary" onClick={handleFilterModalConfirmButtonClick}>Submit</button>
            <button className="button" onClick={handleFilterModalClearButtonClick}>Clear</button>
            <button className="button" onClick={(e) => { closeModal('filter-modal') }}>Close</button>
          </ModalFooter>
        </Modal>

        {/* Delete modal */}

        <Modal id="delete-modal">
          <ModalHeader>
            <span className="text-primary">Delete tests</span>
          </ModalHeader>
          <ModalBody>
            {selectedTests.length === 0
              ? <strong>No tests selected to deletion.</strong>
              : selectedTests.length === 1
                ? <><strong>1 test selected to deletion. </strong>Do you confirm deletion?</>
                : <><strong>{selectedTests.length} tests selected to deletion. </strong>
                    Do you confirm deletion?
                  </>}
            <Collapsible id="deletion-in-progress">
              <div style={ { marginBottom: '10px' } }>
                <span>Deleting...</span>
              </div>
              <ProgressBar/>
            </Collapsible>
            <Collapsible id="deletion-done">
              <span className="text-primary">Result:</span><br/>
              <span dangerouslySetInnerHTML={{ __html: deletionStatus }}></span>
            </Collapsible>
          </ModalBody>
          <ModalFooter>
            <button className="button primary" onClick={handleDeleteModalConfirmButtonClick}>Confirm</button>
            <button className="button" onClick={onDeleteModalCloseButtonClick}>Close</button>
          </ModalFooter>
        </Modal>

        {/* Unselect modal */}

        <Modal id="unselect-modal">
          <ModalHeader>
            Unselect items
          </ModalHeader>
          <ModalBody>
            Do you confirm unselection of all items?
          </ModalBody>
          <ModalFooter>
            <button className="button primary" onClick={onUnselectModalConfirmButtonClick}>Confirm</button>
            <button className="button" onClick={(e) => { closeModal('unselect-modal') }}>Close</button>
          </ModalFooter>
        </Modal>

      </div>

      <Table
        header={header}
        data={tests}
        selectedItemsInfo={selectedTests.length === 0
          ? ''
          : selectedTests.length === 1 ? '1 row selected' : `${selectedTests.length} rows selected`}
        pageInfo={`page ${pageNumber + 1} of ${count !== 0 ? Math.ceil(count / pageLimit) : 1}`}
        secectedItems={selectedTests}
        selectAllChecked={areSelectedAll}
        prevPageDisabled={!prevPage}
        nextPageDisabled={!nextPage}
        onSortClick={handleSorting}
        onSelectAllChange={onSelectAllChange}
        onSelectOneChange={onSelectOneChange}
        onNextPageClick={onNextPageClick}
        onPrevPageClick={onPrevPageClick}
        onSelectedItemsClearClick={handleUnselectButtonClick}
      />

    </>
  )
}

export default TestsPage
