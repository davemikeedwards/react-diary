import React, { useState, useEffect, useRef } from 'react'
import '../css/Calendar.css'
import { Table, Container, Grid, Icon, Button, Dropdown, Modal, Form, Message } from 'semantic-ui-react'
import _ from 'lodash'

const Calendar = () => {

  const todayRef = useRef(null)

  // Data for caledar
  const [dateData, setDateData] = useState([])

  const [entrySearchOptions, setEntrySearchOptions] = useState([])

  useEffect(() => {
    generateCalendarCells()
  })

  // Get & Set date values
  let today = new Date()
  let thisMonth = today.getMonth()
  let thisYear = today.getFullYear()
  const [selectedMonth, setSelectedMonth] = useState(thisMonth)
  const [selectedYear, setSelectedYear] = useState(thisYear)

  const [startHour, setStartHour] = useState('00')
  const [endHour, setEndHour] = useState('00')
  const [startMinute, setStartMinute] = useState('00')
  const [endMinute, setEndMinute] = useState('00')
  const [entryTitle, setEntryTitle] = useState('')
  const [entryDetails, setEntryDetails] = useState('')
  const [entryDate, setEntryDate] = useState('')
  const [entryType, setEntryType] = useState('Please Select')

  const [modalOpen, setModalOpen] = useState(false)
  const [errorMessageVisible, setErrorMessageVisible] = useState(false)
  const [selectedEntryType, setSelectedEntryType] = useState('All Groups')

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const [selectedDate, setSelectedDate] = useState(`${months[selectedMonth]} ${today.getDate()}, ${selectedYear}`)

  const [diaryData, setDiaryData] = useState([])

  const yearOptions = [
    {text: (thisYear - 1), value: (thisYear - 1)},
    {text: thisYear, value: thisYear},
    {text: (thisYear + 1), value: (thisYear + 1)},
    {text: (thisYear + 2), value: (thisYear + 2)},
    {text: (thisYear + 3), value: (thisYear + 3)},
    {text: (thisYear + 4), value: (thisYear + 4)},
    {text: (thisYear + 5), value: (thisYear + 5)}
  ]

  const groups = [
    {text: 'All Groups', value: 'All Groups'},
    {text: 'Work', value: 'Work'},
    {text: 'Personal', value: 'Personal'}
  ]

  const entryGroups = [
    {text: 'Please Select', value: 'Please Select'},
    {text: 'Work', value: 'Work'},
    {text: 'Personal', value: 'Personal'}
  ]

  const minutes = [
    {text: '00', value: '00'},
    {text: '15', value: '15'},
    {text: '30', value: '30'},
    {text: '45', value: '45'},
  ]

  const hours = [
    {text: '00', value: '00'},
    {text: '01', value: '01'},
    {text: '02', value: '02'},
    {text: '03', value: '03'},
    {text: '04', value: '04'},
    {text: '05', value: '05'},
    {text: '06', value: '06'},
    {text: '07', value: '07'},
    {text: '08', value: '08'},
    {text: '09', value: '09'},
    {text: '10', value: '10'},
    {text: '11', value: '11'},
    {text: '12', value: '12'},
    {text: '13', value: '13'},
    {text: '14', value: '14'},
    {text: '15', value: '15'},
    {text: '16', value: '16'},
    {text: '17', value: '17'},
    {text: '18', value: '18'},
    {text: '19', value: '19'},
    {text: '20', value: '20'},
    {text: '21', value: '21'},
    {text: '22', value: '22'},
    {text: '23', value: '23'},
    {text: '24', value: '24'}
  ]

  // Get first day of given month and year
  let firstDay = new Date(selectedYear, selectedMonth).getDay()

  // Get number of days in above month / year
  let daysInMonth = (32 - (new Date(selectedYear, selectedMonth, 32).getDate()))

  // Calendar state management
  const [calendarData, setCalendarData] = useState([
    {name: 0, value: '', hasData: false}, {name: 1, value: '', hasData: false}, {name: 2, value: '', hasData: false}, {name: 3, value: '', hasData: false}, {name: 4, value: '', hasData: false}, {name: 5, value: '', hasData: false}, {name: 6, value: '', hasData: false},
    {name: 7, value: '', hasData: false}, {name: 8, value: '', hasData: false}, {name: 9, value: '', hasData: false}, {name: 10, value: '', hasData: false}, {name: 11, value: '', hasData: false}, {name: 12, value: '', hasData: false}, {name: 13, value: '', hasData: false},
    {name: 14, value: '', hasData: false}, {name: 15, value: '', hasData: false}, {name: 16, value: '', hasData: false}, {name: 17, value: '', hasData: false}, {name: 18, value: '', hasData: false}, {name: 19, value: '', hasData: false}, {name: 20, value: '', hasData: false},
    {name: 21, value: '', hasData: false}, {name: 22, value: '', hasData: false}, {name: 23, value: '', hasData: false}, {name: 24, value: '', hasData: false}, {name: 25, value: '', hasData: false}, {name: 26, value: '', hasData: false}, {name: 27, value: '', hasData: false},
    {name: 28, value: '', hasData: false}, {name: 29, value: '', hasData: false}, {name: 30, value: '', hasData: false}, {name: 31, value: '', hasData: false}, {name: 32, value: '', hasData: false}, {name: 33, value: '', hasData: false}, {name: 34, value: '', hasData: false},
    {name: 35, value: '', hasData: false}, {name: 36, value: '', hasData: false}, {name: 37, value: '', hasData: false}, {name: 38, value: '', hasData: false}, {name: 39, value: '', hasData: false}, {name: 40, value: '', hasData: false}, {name: 41, value: '', hasData: false}
  ])
  const [rowFiveHasData, setRowFiveHasData] = useState(false)
  const [rowSixHasData, setRowSixHasData] = useState(false)

  const [name, setName] = useState('.')

  const [canMoveForward, setCanMoveForward] = useState(true)
  const [canMoveBackward, setCanMoveBackward] = useState(true)

  const [selectedMonthText, setSelectedMonthText] = useState(months[thisMonth])

  // Generates data for calendar cells and text
  const generateCalendarCells = () => {
    let month = selectedMonthText
    let newCalendarData = calendarData
    let firstDayFound = false
    let date = 1
    for (let i = 0; i < 42; i++) {
      let dateDate = date
      if (i === firstDay) {
        newCalendarData[i].value = date.toString()
        dateData.forEach(data => {
          if (data.name === `${month} ${dateDate}, ${selectedYear}`) {
            newCalendarData[i].hasData = true
          }
        })
        firstDayFound = true
        date++
      } else if (!firstDayFound) {

      } else if (date <= daysInMonth) {
        newCalendarData[i].value = date.toString()
        dateData.forEach(data => {
          if (data.name === `${selectedMonthText} ${dateDate}, ${selectedYear}`) {
            newCalendarData[i].hasData = true
          }
        })
        date++
      }
    }

    setCalendarData(newCalendarData)
    
    if (newCalendarData[28].value !== '') {
      setRowFiveHasData(true)
    }

    if (newCalendarData[35].value !== '') {
      setRowSixHasData(true)
    }

    setName('')
  }

  useEffect(() => {
    todayRef.current.handleClick()
  }, [name])

  const incrementMonthYear = async () => {
    clearCalendar()
    let newMonth = selectedMonth + 1
    let newYear = selectedYear
    if (newMonth === 12) {
      newMonth = 0
      newYear = newYear + 1
    }

    if (newMonth === 11 && newYear === yearOptions[6].value) {
      setCanMoveForward(false)
    }

    if (newMonth === 0 && newYear === yearOptions[0].value) {
      setCanMoveBackward(false)
    } else {
      setCanMoveBackward(true)
    }

    setSelectedMonth(newMonth)
    setSelectedYear(newYear)
    setSelectedMonthText(months[newMonth])
  }

  const decrementMonthYear = async () => {
    clearCalendar()
    let newMonth = selectedMonth - 1
    let newYear = selectedYear
    if (newMonth === -1) {
      newMonth = 11
      newYear = newYear - 1
    }

    if (newMonth === 0 && newYear === yearOptions[0].value) {
      setCanMoveBackward(false)
    }

    if (newMonth === 11 && newYear === yearOptions[6].value) {
      setCanMoveForward(false)
    } else {
      setCanMoveForward(true)
    }

    setSelectedMonth(newMonth)
    setSelectedYear(newYear)
    setSelectedMonthText(months[newMonth])
  }

  const goToToday = async () => {
    clearCalendar()
    setSelectedMonth(thisMonth)
    setSelectedYear(thisYear)
    setSelectedMonthText(months[thisMonth])
    setSelectedDate(`${months[thisMonth]} ${today.getDate()}, ${thisYear}`)
    let wasDataFound = false
    dateData.forEach(data => {
      if (data.name === `${months[thisMonth]} ${today.getDate()}, ${thisYear}`) {
        setDiaryData(data.data)
        wasDataFound = true
      } else if (!wasDataFound) {
        setDiaryData([])
      }
    })
    setCanMoveForward(true)
    setCanMoveBackward(true)
  }

  const clearCalendar = async () => {
    setRowFiveHasData(false)
    setRowSixHasData(false)
    setCalendarData([
      {name: 0, value: '', hasData: false}, {name: 1, value: '', hasData: false}, {name: 2, value: '', hasData: false}, {name: 3, value: '', hasData: false}, {name: 4, value: '', hasData: false}, {name: 5, value: '', hasData: false}, {name: 6, value: '', hasData: false},
      {name: 7, value: '', hasData: false}, {name: 8, value: '', hasData: false}, {name: 9, value: '', hasData: false}, {name: 10, value: '', hasData: false}, {name: 11, value: '', hasData: false}, {name: 12, value: '', hasData: false}, {name: 13, value: '', hasData: false},
      {name: 14, value: '', hasData: false}, {name: 15, value: '', hasData: false}, {name: 16, value: '', hasData: false}, {name: 17, value: '', hasData: false}, {name: 18, value: '', hasData: false}, {name: 19, value: '', hasData: false}, {name: 20, value: '', hasData: false},
      {name: 21, value: '', hasData: false}, {name: 22, value: '', hasData: false}, {name: 23, value: '', hasData: false}, {name: 24, value: '', hasData: false}, {name: 25, value: '', hasData: false}, {name: 26, value: '', hasData: false}, {name: 27, value: '', hasData: false},
      {name: 28, value: '', hasData: false}, {name: 29, value: '', hasData: false}, {name: 30, value: '', hasData: false}, {name: 31, value: '', hasData: false}, {name: 32, value: '', hasData: false}, {name: 33, value: '', hasData: false}, {name: 34, value: '', hasData: false},
      {name: 35, value: '', hasData: false}, {name: 36, value: '', hasData: false}, {name: 37, value: '', hasData: false}, {name: 38, value: '', hasData: false}, {name: 39, value: '', hasData: false}, {name: 40, value: '', hasData: false}, {name: 41, value: '', hasData: false}
    ])
  }

  const clearFormState = async () => {
    setEntryDetails('')
    setEntryTitle('')
    setStartHour('00')
    setStartMinute('00')
    setEndHour('00')
    setEndMinute('00')
    setEntryDate('')
    setErrorMessageVisible(false)
    setEntryType('Please Select')
  }

  const submitEntry = async () => {
    if (entryTitle.length < 1 || entryDetails.length < 1 ||  entryType === 'Please Select') {
      setErrorMessageVisible(true)
    } else {
      let dataFound = false
      let dataObject = dateData
      let searchObject = entrySearchOptions
      let iconName

      if (entryType === 'Work') {
        iconName = 'briefcase'
      } else {
        iconName = 'home'
      }

      let newSearchItem = {
        text: entryTitle,
        value: entryDate
      }

      searchObject.push(newSearchItem)

      let newData = {
        title: entryTitle,
        startTime: `${startHour}:${startMinute}`,
        endTime: `${endHour}:${endMinute}`,
        text: entryDetails,
        type: entryType,
        icon: iconName
      }

      let newDateData = {
        name: entryDate,
        data: [{
          title: entryTitle,
          startTime: `${startHour}:${startMinute}`,
          endTime: `${endHour}:${endMinute}`,
          text: entryDetails,
          type: entryType,
          icon: iconName
        }]
      }

      dataObject.forEach(data => {
        if (data.name === entryDate) {
          data.data.push(newData)
          dataFound = true
        }
      })

      if (!dataFound) {
        dataObject.push(newDateData)
      }

      setDateData(dataObject)
      setEntrySearchOptions(searchObject)
      setSelectedDate(entryDate)
      let wasDataFound = false
      dateData.forEach(data => {
        if (data.name === entryDate) {
          setDiaryData(data.data)
          wasDataFound = true
        } else if (!wasDataFound) {
          setDiaryData([])
        }
      })
      setModalOpen(false)
      setEntryDetails('')
      setEntryTitle('')
      setStartHour('00')
      setStartMinute('00')
      setEndHour('00')
      setEndMinute('00')
      setEntryDate('')
      generateCalendarCells()
      setErrorMessageVisible(false)
      setEntryType('Please Select')
    }
  }

  const buttonsVisible = async (e) => {
    if (selectedMonth === 0 && Number(e.currentTarget.textContent) === yearOptions[0].value) {
      setCanMoveBackward(false)
    } else {
      setCanMoveBackward(true)
    }

    if (selectedMonth === 11 && Number(e.currentTarget.textContent) === yearOptions[6].value) {
      setCanMoveForward(false)
    } else {
      setCanMoveForward(true)
    }
  }

  const getDate = async (e) => {
    setSelectedDate(`${selectedMonthText} ${e.currentTarget.textContent}, ${selectedYear}`)
    let dataFound = false
    dateData.forEach(data => {
      if (data.name === `${selectedMonthText} ${e.currentTarget.textContent}, ${selectedYear}`) {
        setDiaryData(data.data)
        dataFound = true
      } else if (!dataFound) {
        setDiaryData([])
      }
    })
  }

  const [searchResults, setSearchResults] = useState([])
  const [searchTableVisible, setSearchTableVisible] = useState('hidden')
  const [arrowHidden, setArrowHidden] = useState(true)

  const performSearch = async (e) => {
    let searchValue = e.target.value
    let searchResult = []

    if (searchValue.length < 1) {
      setSearchResults([])
      setSearchTableVisible('hidden')
    } else {
      entrySearchOptions.forEach(data => {
        if (data.text.toLowerCase().includes(searchValue) || data.text.toUpperCase().includes(searchValue) || data.text.includes(searchValue)) {
          searchResult.push(data)
        }
      })

      if (searchResult.length > 0) {
        setSearchResults(searchResult)
        setSearchTableVisible('visible')
        setArrowHidden(true)
      } else {
        setSearchResults([{text: 'No matches for search criteria', value: 'Check spelling / case'}])
        setSearchTableVisible('visible')
        setArrowHidden(false)
      }
    }
  }

  const goToSearchDay = async (e) => {
    let month = e.split(' ')[0]
    let monthDate = e.split(',')[0]
    let date = monthDate.split(' ')[1]
    let year = e.split(', ')[1]

    clearCalendar()
    setSelectedMonth(months.indexOf(month))
    setSelectedYear(Number(year))
    setSelectedMonthText(month)
    setSelectedDate(`${month} ${date}, ${Number(year)}`)

    let dataFound = false
    dateData.forEach(data => {
      if (data.name === `${month} ${date}, ${Number(year)}`) {
        setDiaryData(data.data)
        dataFound = true
      } else if (!dataFound) {
        setDiaryData([])
      }
    })
    setSearchResults([])
    document.getElementById('searchInput').value = ''
    setSearchTableVisible('hidden')
  }

  return (
  <Container fluid style={{ padding: '50px' }}>
    <Grid>
      <Grid.Row>
        <Grid.Column width={8}>
          <Table fixed celled style={{ border: '1px solid #bbb' }}>
            <Table.Header>
              <Table.Row textAlign='center'>
                {!canMoveBackward && <Table.HeaderCell style={{ background: 'rgb(157, 58, 223, 0.2)' }}></Table.HeaderCell>}
                {canMoveBackward && <Table.HeaderCell style={{ background: 'rgb(157, 58, 223, 0.2)' }} onClick={decrementMonthYear} className='calendarArrowBox'><Icon className='calendarArrow' style={{ color: '#555' }} name='arrow left' /></Table.HeaderCell>}
                <Table.HeaderCell style={{ background: 'rgb(157, 58, 223, 0.2)' }}><Button ref={todayRef} onClick={goToToday} primary content='Today' className='calendarButton' /></Table.HeaderCell>
                <Table.HeaderCell style={{ background: 'rgb(157, 58, 223, 0.2)' }} className='calendarMonth' colSpan={3}>{selectedMonthText}</Table.HeaderCell>
                <Table.HeaderCell style={{ overflow: 'visible', background: 'rgb(157, 58, 223, 0.2)' }}><Dropdown onChange={e => {clearCalendar(); setSelectedYear(Number(e.currentTarget.textContent)); buttonsVisible(e);}} icon={null} className='calendarDropDown' selection compact value={selectedYear} options={yearOptions} /></Table.HeaderCell>
                {canMoveForward && <Table.HeaderCell style={{ background: 'rgb(157, 58, 223, 0.2)' }} disabled={!canMoveForward} onClick={incrementMonthYear} className='calendarArrowBox'><Icon className='calendarArrow' style={{ color: '#555' }} name='arrow right' /></Table.HeaderCell>}
                {!canMoveForward && <Table.HeaderCell style={{ background: 'rgb(157, 58, 223, 0.2)' }}></Table.HeaderCell>}
              </Table.Row>
              <Table.Row textAlign='center'>
                <Table.HeaderCell style={{ background: 'rgb(157, 58, 223, 0.2)', color: '#555' }}>Sun</Table.HeaderCell>
                <Table.HeaderCell style={{ background: 'rgb(157, 58, 223, 0.2)', color: '#555' }}>Mon</Table.HeaderCell>
                <Table.HeaderCell style={{ background: 'rgb(157, 58, 223, 0.2)', color: '#555' }}>Tue</Table.HeaderCell>
                <Table.HeaderCell style={{ background: 'rgb(157, 58, 223, 0.2)', color: '#555' }}>Wed</Table.HeaderCell>
                <Table.HeaderCell style={{ background: 'rgb(157, 58, 223, 0.2)', color: '#555' }}>Thu</Table.HeaderCell>
                <Table.HeaderCell style={{ background: 'rgb(157, 58, 223, 0.2)', color: '#555' }}>Fri</Table.HeaderCell>
                <Table.HeaderCell style={{ background: 'rgb(157, 58, 223, 0.2)', color: '#555' }}>Sat</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row textAlign='center' style={{ height: '75px' }}>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{name}{calendarData[0].value}{calendarData[0].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[1].value}{calendarData[1].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[2].value}{calendarData[2].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[3].value}{calendarData[3].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[4].value}{calendarData[4].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[5].value}{calendarData[5].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[6].value}{calendarData[6].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
              </Table.Row>
              <Table.Row textAlign='center' style={{ height: '75px' }}>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[7].value}{calendarData[7].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[8].value}{calendarData[8].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[9].value}{calendarData[9].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[10].value}{calendarData[10].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[11].value}{calendarData[11].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[12].value}{calendarData[12].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[13].value}{calendarData[13].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
              </Table.Row>
              <Table.Row textAlign='center' style={{ height: '75px' }}>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[14].value}{calendarData[14].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[15].value}{calendarData[15].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[16].value}{calendarData[16].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[17].value}{calendarData[17].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[18].value}{calendarData[18].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[19].value}{calendarData[19].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[20].value}{calendarData[20].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
              </Table.Row>
              <Table.Row textAlign='center' style={{ height: '75px' }}>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[21].value}{calendarData[21].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[22].value}{calendarData[22].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[23].value}{calendarData[23].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[24].value}{calendarData[24].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[25].value}{calendarData[25].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[26].value}{calendarData[26].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[27].value}{calendarData[27].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
              </Table.Row>
              {rowFiveHasData && <Table.Row textAlign='center' style={{ height: '75px' }}>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[28].value}{calendarData[28].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[29].value}{calendarData[29].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[30].value}{calendarData[30].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[31].value}{calendarData[31].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[32].value}{calendarData[32].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[33].value}{calendarData[33].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[34].value}{calendarData[34].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
              </Table.Row>}
              {rowSixHasData && <Table.Row textAlign='center' style={{ height: '75px' }}>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[35].value}{calendarData[35].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[36].value}{calendarData[36].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[37].value}{calendarData[37].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[38].value}{calendarData[38].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[39].value}{calendarData[39].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[40].value}{calendarData[40].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
                <Table.Cell className='selectableCell' selectable onClick={e => getDate(e)}>{calendarData[41].value}{calendarData[41].hasData && <Icon style={{ position: 'relative', top: '-10px', right: '-5px', color: 'rgb(157, 58, 223)' }} name='circle' size='small' />}</Table.Cell>
              </Table.Row>}
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column width={8}>
          <Table attached='top' style={{ border: '1px solid #bbb', borderBottom: 'none' }}>
            <Table.Header>
              <Table.Row style={{ height: '56px' }}>
                <Table.HeaderCell style={{ background: 'rgb(157, 58, 223, 0.2)' }} className='calendarMonth'>{selectedDate}</Table.HeaderCell>
                <Table.HeaderCell style={{ background: 'rgb(157, 58, 223, 0.2)', textAlign: 'right' }}>
                  <Dropdown icon={null} className='calendarDropDownTwo' value={selectedEntryType} options={groups} onChange={e => {setSelectedEntryType(e.currentTarget.textContent)}} compact selection />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>
          <Table attached style={{ border: '1px solid #bbb', borderBottom: 'none', borderTop: '1px solid #eee' }}>
            <Table.Body>
              <Table.Row style={{ height: '47px' }}>
                <Table.Cell width={14}>Add new entry</Table.Cell>
                <Table.Cell><Icon onClick={e => {setModalOpen(true); setEntryDate(selectedDate);}} className='diaryPencil' name='pencil' /></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table attached='bottom' style={{ border: '1px solid #bbb', borderTop: '1px solid #eee' }}>
            <Table.Body>
              {dateData && _.map(diaryData, (entry) => {
                if (selectedEntryType === 'All Groups') {
                  return (
                    <Table.Row key={entry.title}>
                      <Table.Cell textAlign='center' style={{ color: '#777', fontSize: '20px' }} width={2}>{entry.startTime} <p style={{ fontSize:'10px' }}>TO</p> {entry.endTime}</Table.Cell>
                      <Table.Cell width={1} textAlign='center' style={{ color: '#aaa', fontSize: '20px' }}><Icon name={entry.icon} /></Table.Cell>
                      <Table.Cell><b>{entry.title}</b><br/>{entry.text}</Table.Cell>
                    </Table.Row>
                  )
                } else {
                  if (entry.type === selectedEntryType) {
                    return (
                      <Table.Row key={entry.title}>
                        <Table.Cell textAlign='center' style={{ color: '#777', fontSize: '20px' }} width={2}>{entry.startTime} <p style={{ fontSize:'10px' }}>TO</p> {entry.endTime}</Table.Cell>
                        <Table.Cell><b>{entry.title}</b><br/>{entry.text}</Table.Cell>
                      </Table.Row>
                    )
                  }
                }
              })}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8}>
          <p style={{ fontSize: '16px', paddingBottom: '0', marginBottom: '0' }}>Search for entries in the diary</p>
          <Form>
            <Form.Input id='searchInput' className='searchInput' onChange={e => performSearch(e)} fluid placeholder='Search for entries...' />
          </Form>
          <Table style={{ visibility: `${searchTableVisible}` }} className='resultsTable' attached='bottom'>
            <Table.Body>
              {searchResults && _.map(searchResults, (result) => 
                <Table.Row style={{ height: '50px', border: 'none' }} key={result.text}>
                  <Table.Cell>{result.text} - {result.value}</Table.Cell>
                  <Table.Cell textAlign='right'>{arrowHidden && <Icon onClick={e => goToSearchDay(result.value)} name='arrow right' className='searchIcon' />}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Modal style={{ position: 'absolute', top: '113px' }} open={modalOpen} size='tiny'>
      <Modal.Header className='modalHeader'>Create New entry</Modal.Header>
      <Modal.Content>
        <Message hidden={!errorMessageVisible} size='tiny' negative>
          <Message.Header>There was a problem</Message.Header>
          <p>Ensure all fields are filled out</p>
        </Message>
        <Form>
          <Form.Field inline>
            <label>Assign to Group</label>
            <Dropdown compact onChange={e => {setEntryType(e.currentTarget.textContent)}} selection className='calendarDropDownTwo' options={entryGroups} icon={null} value={entryType} />
          </Form.Field>
          <Form.Input onChange={e => {setEntryTitle(e.target.value)}} label='Title' placeholder='Entry title...' />
          <Form.TextArea onChange={e => {setEntryDetails(e.target.value)}} label='Details' placeholder='Entry Details...' />
          <Form.Group widths='equal'>
            <Form.Dropdown onChange={e => {setStartHour(e.currentTarget.textContent)}} icon={null} selection options={hours} value={startHour} compact label='Start Hour' />
            <Form.Dropdown onChange={e => {setStartMinute(e.currentTarget.textContent)}} icon={null} selection options={minutes} value={startMinute} compact label='Start Minute' />
            <Form.Dropdown onChange={e => {setEndHour(e.currentTarget.textContent)}} icon={null} selection options={hours} value={endHour} compact label='End Hour' />
            <Form.Dropdown onChange={e => {setEndMinute(e.currentTarget.textContent)}} icon={null} selection options={minutes} value={endMinute} compact label='End Minute' />
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions className='modalFooter'>
        <Button onClick={e => {setModalOpen(false); clearFormState();}} className='calendarButtonTwo' content='Cancel' />
        <Button onClick={e => {submitEntry()}} className='calendarButton' content='Submit' />
      </Modal.Actions>
    </Modal>
  </Container>
)}

export default Calendar