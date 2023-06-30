import axios from 'axios'
import React, { useEffect, useState } from 'react'
import axiosClient from './axios-client';

const Scrapper = () => {
  const env = import.meta.env; // get env config
  const [request, setRequestState] = useState(false)
  const [data, setData] = useState([])
  const [baseUrls, setBaseURL] = useState([
    `${env.VITE_NEWS_API_ORG_BASEURL}?pageSize=100&page=1&q=all&apiKey=${env.VITE_NEWS_API_KEY}`,
    `${env.VITE_NYT_API_BASEURL}?page=200&api-key=${env.VITE_NYT_API_KEY}`,
    `${env.VITE_GUARDIAN_API_ORG_BASEURL}?api-key=${env.VITE_GUARDIAN_API_KEY}&page=1&page-size=200`
  ])
  const [sendState, setSendState] = useState(false)

  const allRequest = () => {
    if (!request) {
      setRequestState(!request)
      const requests = baseUrls.map((url) => axios.get(url));
      axios.all(requests).then((responses) => {
        responses.forEach((resp) => {

          //NYT response data
          if (resp.data?.response?.docs) {
            resp.data?.response?.docs.map((item) => {
              if (item.lead_paragraph != '') {
                data.push({
                  from: 'NYT',
                  news_id: item._id,
                  source: item.source,
                  categories: item.section_name ?? '',
                  author: '',
                  publish_date: item.pub_date,
                  content: item.lead_paragraph,
                  titleContent: item.abstract,
                  image: '',
                })
              }

            })
            setData([...data]);

          }

          //NewsAPI.org response data
          if (resp.data?.articles) {
            resp.data?.articles?.map((item) => {
              if (item.description != '') {

                data.push({
                  from: 'NewsAPI.org',
                  news_id: item.content,
                  source: item.source.name,
                  categories: item.section_name ?? '',
                  author: item.author,
                  publish_date: item.publishedAt,
                  content: item.description,
                  titleContent: item.title,
                  image: item.urlToImage,

                })
              }
            })
            setData([...data]);
          }

          //The Guardian
          if (resp.data?.response?.results) {
            resp.data?.response?.results?.map((item) => {
              if (item.description != '') {

                data.push({
                  from: 'The Guardian',
                  news_id: item.id,
                  source: 'The Guardian',
                  categories: item.sectionName ?? '',
                  author: 'The Guardian',
                  publish_date: item.webPublicationDate,
                  content: item.webTitle,
                  titleContent: item.webUrl,
                  image: item.urlToImage ?? '',
                })
              }
            })
            setData([...data]);

            setSendState(!sendState)
          }
        });
      });
    } // New York New API request
    // if (sendState) {
    //   console.log(data)
    //   const payload = { allDatas: JSON.stringify(data) }
    //   axiosClient.post('/ReceiveData', payload)
    //     .then(({ data }) => {
    //        setSendState(false)
    //     })
    //     .catch((err) => {
    //       const response = err.response;
    //       console.log(error)
    //       setSendState(false)
    //     })
    // }
  }

  return allRequest()

  //   // Promise.all([
  //   //   NYTAPIRequest(),
  //   //   newsAPIRequest(),
  //   //   D_Gardian_APIRequest()

  //   // ]).then((res) => {
  //   //   console.log(res)
  //   //   console.log(data)
  //   // })




  // return Promise.all([newsAPIRequest, NYTAPIRequest]);

}

export default Scrapper;
