import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const [selectedBatch, setSelectedBatch] = useState(' ');
    const [selectedSection, setSelectedSection] = useState(' ');
    const [selectedGender, setSelectedGender] = useState(' ');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            keyword,
            batch: selectedBatch,
            section: selectedSection,
            gender: selectedGender,
            }),
        });

        const data = await response.json();
        setSearchResults(data.results);
        } catch (error) {
        console.error('Error during search:', error);
        }
    };

    useEffect(() => {
    handleSearch();
    }, []);

return (
    <div>
        <div className='home-main'>
            <Sidebar />
            <div className='search-main'>
                <h2>Search</h2>
                <div className='search-pane'>
                    <input
                        type='text'
                        id='search'
                        name='search'
                        placeholder='Type any keyword'
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <div className='search-cat'>
                        <select
                            value={selectedBatch}
                            onChange={(e) => setSelectedBatch(e.target.value)}
                        >
                            <option value=' '> Select Batch</option>
                            <option value='2000'>2000</option>
                            <option value='2001'>2001</option>
                        </select>

                        <select
                            value={selectedSection}
                            onChange={(e) => setSelectedSection(e.target.value)}
                        >
                            <option value=' '> Select Section</option>
                            <option value='Section1'>Section 1</option>
                            <option value='Section2'>Section 2</option>
                        </select>

                        <select
                            value={selectedGender}
                            onChange={(e) => setSelectedGender(e.target.value)}
                        >
                            <option value=' '> Select Gender</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                        </select>

                        <button onClick={handleSearch} className='search-btn'>Search</button>
                    </div>
                </div>
                
                <div className='result-box'>
                    {searchResults.map((result) => (
                <div key={result.id}>{result.name}</div>
                    ))}
                </div>
        
                <div className='suggest-box'>
                    <h3>Browse</h3>
                    {/* <div className='suggest-box-inner'>
                        {suggestedChips.length === 0 ? (
                            <h4>No suggestions available.</h4>
                        ) : (
                            suggestedChips.map((chip) => (
                        <div key={chip} className='suggested-chip'>
                            {chip}
                        </div>
                            ))
                        )};
                    </div> */}
                </div>
            </div>
        </div>
    </div>
);
};

export default Search;
