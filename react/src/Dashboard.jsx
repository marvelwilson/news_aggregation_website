import React, { useEffect, useRef, useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import axiosClient from "./axios-client";
import NewsContent from "./components/newsContent";
import { SearchFilter, DateFilter, FilterCategories, FilterAuthors } from "./components/SearchComponent";
import DifFilter from "./components/DifFilter";

export default function Dashboard() {
  const [selectedCatOptions, setSelectedCatOptions] = useState();

  const [loading, setLoading] = useState(true);
  const [Filtered, setFiltered] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [authors, setAuthors] = useState([])
  const [source, setSources] = useState([])

  const [news, setNews] = useState([])
  const [userDetail, setDetail] = useState()


  useEffect(() => {
    if (loading) {
      axiosClient.get(`/user`)
        .then(({ data }) => {
          setNews(data.data)
          setDetail(data.user)
          setFiltered(data.data)
          setLoading(!loading)
          DifFilter({ setAuthors, setCategories, setSources, data: data.data })
          if (userDetail?.prefered_sources=='') {
            const payload = {
              user_id: userDetail.id,
              sources: JSON.stringify(source),
              authors: JSON.stringify(authors),
              categories: JSON.stringify(categories),
            }
            console.log(userDetail.prefered_sources)
          axiosClient.post(`/preference`, payload)
              .then((data) => {
              
              })
              .catch((error) => {
                console.log(error)
                setLoading(false)
              })
          } 
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
        })

      
    }



  }, [selectedCatOptions])


  // Array of all options

 


  console.log(source)

  return (
    <MDBContainer className="py-5">
      {/* <DifFilter setAuthors={setAuthors} setCategories={setCategories} setSources={setSources} data={news} /> */}
      <MDBRow className="gx-5 border-bottom pb-4 mb-5 mt-5">

        <MDBCol md="6" className="mb-4 justify-content-center container">
          <h3 className="text-center">
            <strong>News</strong>
          </h3>
          <p className="text-muted text-center mt-2">
            Read the most current news!
          </p>
        </MDBCol>
        <MDBRow>
          <MDBCol md="12">
            <SearchFilter itemList={news} setFiltered={setFiltered} setSearch={setSearch} />
          </MDBCol>
          <MDBCol md="4">
            <FilterAuthors setFiltered={setFiltered} Filtered={Filtered} news={news} search={search} authors={authors} />
          </MDBCol>
          <MDBCol md="4" className="mb-3">
            <FilterCategories setFiltered={setFiltered} Filtered={Filtered} news={news} search={search} categories={categories} />
          </MDBCol>
          <MDBCol md="4">
            <DateFilter itemList={Filtered} setFiltered={setFiltered} search={search} />
          </MDBCol>
        </MDBRow>
      </MDBRow>
      {loading ?
        <div className="card text-center">
          Loading.....
        </div>
        :
        <><MDBRow className="gx-lg-5">

          {Filtered.map((content) => {
            return <NewsContent key={content.id} contents={content} />
          })
          }
        </MDBRow>
        </>
      }
    </MDBContainer>
  );
}
