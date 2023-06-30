import { MDBInputGroup } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import Select from 'react-select';

function SearchFilter({ setFiltered, itemList, setSearch, ...props }) {

  const HandleSeach = (e) => {
    // Access input value
    const query = e.target.value;
    // Create copy of item list
    setSearch(query)

    var updatedList = [...itemList];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      let search = (item.content.toLowerCase().indexOf(query.toLowerCase()) !== -1 ?? item.titleContent.toLowerCase().indexOf(query.toLowerCase()) !== -1);
      return search;
    });
    // Trigger render with updated values
    setFiltered(updatedList);
  }


  return <input type="search" className="Searchinput" onChange={HandleSeach} placeholder="Search News" />
};


function DateFilter({ setFiltered, search, itemList, ...props }) {
  const [valu, setValue] = useState('')
  const HandleFilter = (e) => {
    // Access input value
    const query = e.target.value;
    // Create copy of item list
     setValue(query)
    var updatedList = [...itemList];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      let s = (item.publish_date <= query);
      return s;
    });
    // Trigger render with updated values
    setFiltered(updatedList);
  }
  
  return (
  
  <MDBInputGroup className='mb-3'>
  
        <span onClick={()=> setValue(false)} className='input-group-text' style={{height:40}}><small>Reset</small></span>
        <input disabled={search?false:true} value={valu} type="date" className="form-control Searchinput" onChange={HandleFilter} placeholder="Search News" />
      </MDBInputGroup>


  )
};

function FilterCategories({ setFiltered, Filtered, search, categories, news, ...props }) {
  // Access input value
  const [selectedOptions, setSelectedOptions] = useState();
  function handleSelect(data) {
   let holdVals = [];
    data.map((item) => {
      holdVals.push(item.value)
    })


    var updatedList = [...Filtered];
    // Include all elements which includes the search query
    updatedList = updatedList.filter(item => holdVals.includes(item.categories));
    // Trigger render with updated values

    if (holdVals.length < 1) {
      var updatedList = [...news];
      updatedList = updatedList.filter((item) => {
          return (item.content.toLowerCase().indexOf(search.toLowerCase()) !== -1??item.titleContent.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      });
    }
    console.log(Filtered)

  setFiltered(updatedList);

  }


  return (
    <div className="app">
      <div className="dropdown-container">
        <Select
          isDisabled={search?false:true}
          options={categories}
          placeholder="Select Categories"
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
          isMulti
        />
      </div>
    </div>
  )

};


function FilterAuthors({ setFiltered, Filtered, search, authors, news, ...props }) {
  // Access input value
  const [selectedOptions, setSelectedOptions] = useState();
  function handleSelect(data) {
   let holdVals = [];
    data.map((item) => {
      holdVals.push(item.value)
    })
   console.log(authors)
    var updatedList = [...Filtered];
    // Include all elements which includes the search query
    updatedList = updatedList.filter(item => holdVals.includes(item.author));
    // Trigger render with updated values

    console.log(search)
    if (holdVals.length < 1) {
    var updatedList = [...news];
      updatedList = updatedList.filter((item) => {
          return (item.content.toLowerCase().indexOf(search.toLowerCase()) !== -1??item.titleContent.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      });
    }
  setFiltered(updatedList);

  }


  return (
    <div className="app">
      <div className="dropdown-container">
        <Select
         isDisabled={search?false:true}
          options={authors}
          placeholder="Select Author"
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
          isMulti
        />
      </div>
    </div>
  )

};

export { SearchFilter, DateFilter, FilterCategories, FilterAuthors}