import React, { useEffect, useState } from 'react';
import { url, service } from '../helpers';
import Cards from '../components/Card'; 
import AutoSuggest from 'react-autosuggest';
import Loading from '../components/Loading';

const Personnel = () => {

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(true)
    const [number, setNumber] = useState(0)
    const [suggestions, setSuggestions] = useState([])
    const [value, setValue] = useState('')
    const [totalData, setTotalData] = useState(0)
    const [searchData, setSearchData] = useState([])

    // eslint-disable-next-line
    const limit = 4

    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        
        return inputLength === 0 ? [] : data.filter(lang =>
            lang.name.first.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    const getSuggestionValue = suggestion => `${suggestion.name.first} ${suggestion.name.last}`;

    const renderSuggestion = suggestion => (
        // console.log(suggestion)
        <div>
            {suggestion.name.first} {suggestion.name.last}
        </div>
    );

    const onSuggestChange = (event, { newValue }) => {
       setValue(newValue)
    };
    
    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value))
    };
    
    // Autosuggest will call this function every time you need to clear suggestions.
    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    };
    
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
        placeholder: 'Find Personnels',
        value,
        onChange: onSuggestChange
    };

    useEffect(() => {
        getData()
    // eslint-disable-next-line
    }, [])

    const getData = () => {
        service.onGet(url.get_personnels)
        .then((res) => {
            // console.log(res.data)
            setData(res.data.results)
            let dataFilter = res.data.results.slice(number,limit)
            setFilteredData(dataFilter)
            setTotalData(res.data.results.length)
        })
        .catch((err) => {
            console.log(err)
            setData([])
        })
        .finally(() => {
            setLoading(false)
        })
    }

    const filterData = ( offset, type = "" ) => {
        // console.log(data, 'filtr')
        if (data) {
            
            if (type === "search") {
                // cek name
                let inputName = value.split(' ')
                
                if (value) {
                    let filteredName = data.filter((userName) => {
                        return (
                            userName.name.first.toLowerCase().includes(inputName[0].toLocaleLowerCase())
                        )
                    })
    
                    setTotalData(filteredName.length)
                    let finalFilterName = filteredName.slice(0, 0 + limit)
                    setSearchData(filteredName)
                    setFilteredData(finalFilterName)
                    setValue('')
                    setNumber(0)
                    // console.log(offset)
                    // console.log(filteredData)
                } else {
                    // setNumber(offset)
                    setTotalData(data.length)
                    // setValue('')
                    let filtered = data.slice(offset, offset + limit)
                    setFilteredData(filtered)
                    setSearchData([])
                }
            } else {
                if (searchData.length) {
                    // console.log('data hasil search')
                    let filtered = searchData.slice(offset, offset + limit)
                    setFilteredData(filtered)    
                } else {
                    // console.log('data biasa')
                    let filtered = data.slice(offset, offset + limit)
                    setFilteredData(filtered)
                }
            }
        }
    }
   
   
    const renderData = () => {
        if (filteredData.length) {
            return filteredData.map((val, index) => {
                return (
                    <Cards
                        key={index} 
                        id={val.id.value}
                        firstName={val.name.first}
                        lastName={val.name.last}
                        email={val.email}
                        dob={val.dob.date}
                        phone={val.phone}
                        picture={val.picture.thumbnail}
                    />
                )
            })
        }
        return (
            <div>No Data Available</div>
        )
    }

    const onClickSwitch = ( type ) => {
        if (type === 'next') {
            if (number + limit >= totalData) {
                setNumber( totalData - limit)
            } else {
                setNumber( number + limit)
            }
            filterData(number + limit)
        } else if (type === 'next' && value) {
            if (number + limit >= totalData) {
                setNumber( totalData - limit)
            } else {
                setNumber( number + limit, "search")
            }
            filterData(number + limit)
        } else {
            if (number <= 0) {
                setNumber( 0 )
            } else {
                setNumber( number - limit)
            }
            filterData(number - limit)
        }
    }

    return(
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div className="home-container-top">
                <div className="home-header">
                    <div className="home-header-text">
                        <h2 style={{ color: '#23c7c6', fontWeight: 'bold' }}>PERSONNEL LIST</h2>
                        <h5 style={{ color: 'grey', fontWeight: 'bold' }}>List of all personnels</h5>
                    </div>
                    <div className="home-header-content-container">
                        <div className="home-header-content">
                            <div >
                                <label style={{ position: 'relative', margin: 0 }}>
                                <AutoSuggest
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                                    getSuggestionValue={getSuggestionValue}
                                    renderSuggestion={renderSuggestion}
                                    inputProps={inputProps}                                    
                                />        
                                 <svg onClick={() => filterData( number ,'search')} xmlns="http://www.w3.org/2000/svg" strokeWidth="1" fontWeight='bold' width="16" height="16" fill={value?"currentColor":"grey"} className="bi bi-search search-logo" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>                            
                                </label>                                
                            </div>
                            
                            <div className="button-add">
                                Add Personel 
                                <svg style={{ fontWeight: 'bolder'}} xmlns="http://www.w3.org/2000/svg" fontSize="14"  fontWeight="bold" width="26" height="26" fill="#ffff" className="bi bi-plus" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="home-container-middle">
                <div className="row home-header-middle">
                    {
                        !loading ?
                        <div className="container-page-content">
                            <div className="container-cards" style={{justifyContent:filteredData.length >=4 ?'space-between' : 'space-evenly'}}>
                                {renderData()}
                            </div>
                            <div className="navigation-button-container">
                                    <div onClick={() => onClickSwitch('prev')} disabled={ number <= 0 } className={ number <= 0 ? 'navigation-button-disabled' : 'navigation-button'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                        </svg> 
                                        Previous Page
                                    </div>
                                    <div onClick={() => onClickSwitch('next')} disabled={ number + limit >= totalData} className={ number + limit >= totalData ? 'navigation-button-disabled' : 'navigation-button'}>
                                        Next Page 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </div>
                            </div>
                        </div>
                        :
                        <Loading/>
                    }
                </div>                 
            </div>
        </div>
    )
}

export default Personnel;