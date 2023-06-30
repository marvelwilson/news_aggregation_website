import React, { useState } from 'react'

export default function DifFilter({ setAuthors, setCategories, setSources, data, id }) {

  let cat = [];
  let auth = [];
  let src = [];

  let cati = [];
  let authi = [];
  let srci = [];
  if (!srci[0]?.cat?.value) {

    data?.map((item) => {
      cat.push(item.categories)
      auth.push(item.author)
      src.push(item.source)

    })
    const filteredAuth = [...new Set(auth)];
    const filteredCat = [...new Set(cat)];
    const filteredSrc = [...new Set(src)];


    filteredAuth?.map(item => { authi.push({ value: item, label: item })  })
    filteredCat?.map(item => { cati.push({ value: item, label: item }) } )
    filteredSrc?.map(item => { srci.push({ value: item, label: item }) } )
    setAuthors(authi)
    setCategories(cati)
    setSources(srci)
  }

}
