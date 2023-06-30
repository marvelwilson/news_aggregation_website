import React, { useEffect, useRef, useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import Select from "react-select";
import axiosClient from "../axios-client";
import DifFilter from "../components/DifFilter";

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedAuthor, setSelectedAuthor] = useState();
  const [selectedSource, setSelectedSource] = useState()

  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState([])
  const [authors, setAuthors] = useState([])
  const [source, setSources] = useState([])

  const [id, setID] = useState()




  useEffect(() => {
    if (loading) {

      axiosClient.get(`/user`)
        .then(({ data }) => {
          setID(data.user.id)
          const authors = data.user?.prefered_authors?JSON.parse(data.user?.prefered_authors):'';
          setSelectedAuthor(authors)

          const categories = data.user?.prefered_categories?JSON.parse(data.user?.prefered_categories):'';
          setSelectedCategory(categories)

          const source = data.user?.prefered_sources?JSON.parse(data.user?.prefered_sources):'';
          setSelectedSource(source)
          
          setLoading(!loading)
          DifFilter({ setAuthors, setCategories, setSources, data: data.reference })
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
        })
    }

  }, [selectedCategory])


  // Array of all options

  const handleSelectCategory = (data) => {
    setSelectedCategory(data);
  }
  

  const handleSelectAuthor = (data) => {
    setSelectedAuthor(data);
  }

  const handleSelectSource = (data) => {
    setSelectedSource(data);
  }

  const SaveChanges = () =>{
    setSubmitted(true)
    console.log(source)
    const payload = {
      user_id: id,
      sources: selectedSource?JSON.stringify(selectedSource):JSON.stringify(source),
      authors: selectedAuthor?JSON.stringify(selectedAuthor):JSON.stringify(authors),
      categories: selectedCategory?JSON.stringify(selectedCategory):JSON.stringify(categories),
    }
    axiosClient.post('/preference', payload)
    .then(({ data }) => {
      setSubmitted(false)
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
      setSubmitted(false)
    })
  }
  return (
    <MDBContainer className="py-5">
      {/* <DifFilter setAuthors={setAuthors} setCategories={setCategories} setSources={setSources} data={news} /> */}
      <MDBRow className="gx-5 border-bottom pb-4 mb-5 mt-5">

        <MDBCol md="6" className="mb-4 justify-content-center container">
          <h3 className="text-center">
            <strong>Preference</strong>
          </h3>
          <p className="text-muted text-center mt-2">
            Ajust settins to personalize your experience on this platform
          </p>
        </MDBCol>
        <MDBRow>

        </MDBRow>
      </MDBRow>
      {loading ?
        <div className="card text-center">
          Loading.....
        </div>
        :
        <MDBRow className="gx-lg-5">
          <MDBCol md="4" className="mb-2">
            <div className="app">
              <div className="dropdown-container">
                <Select
                  options={source}
                  placeholder="Select Sources"
                  value={selectedSource}
                  onChange={handleSelectSource}
                  isSearchable={true}
                  isMulti
                />
              </div>
            </div>
          </MDBCol>
          <MDBCol md="4" className="mb-2">
            <div className="app">
              <div className="dropdown-container">
                <Select
                  options={categories}
                  placeholder="Select Categories"
                  value={selectedCategory}
                  onChange={handleSelectCategory}
                  isSearchable={true}
                  isMulti
                />
              </div>
            </div>
          </MDBCol>
          <MDBCol md="4">
            <div className="app">
              <div className="dropdown-container">
                <Select
                  options={authors}
                  placeholder="Select Authors "
                  value={selectedAuthor}
                  onChange={handleSelectAuthor}
                  isSearchable={true}
                  isMulti
                />
              </div>
            </div>
          </MDBCol>
          <MDBCol col="6" className="text-end mt-3">
            <button className="btn" onClick={submitted?'':SaveChanges}>{submitted?'Processing.....':'Save'}</button>
          </MDBCol>
        </MDBRow>

      }
    </MDBContainer>
  );
}
