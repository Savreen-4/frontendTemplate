import React from "react";
import { Form, FormControl } from "react-bootstrap";

const SearchBar = ({ placeholder, onSearch }) => {
    const handleSearch = (event) => {
        onSearch(event.target.value);
    };

    return (
        <div className="flex-grow-1">
            <Form className="d-flex">
                <FormControl
                    type="search"
                    placeholder={placeholder || "Search..."}
                    className="me-2 search-w"
                    aria-label="Search"
                    onChange={handleSearch}
                />
            </Form>
        </div>
    );
};

export default SearchBar;
