import React, { useState, useEffect } from 'react';
import { FaFilter } from 'react-icons/fa';
import './Reservations.css';
import CustomHelmet from '../Helmet/CustomHelmet';

const Reservations = () => {
  const title = "Discover Resorts";

  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to toggle the filter pane
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [reservationsPerPage] = useState(5); // Number of reservations per page
  const [filter, setFilter] = useState({
    reservationNumber: '',
    mobileNumber: '',
    checkInDate: new Date().toISOString().split('T')[0], // Set today's date by default
  });
  const [reservations, setReservations] = useState([]); // State to hold reservation data
  const [totalPages, setTotalPages] = useState(1); // Total pages from API
  const [loading, setLoading] = useState(false); // State to track the loading state
  const [isFilterApplied, setIsFilterApplied] = useState(false); // Track if filters are applied

  const fetchReservations = () => {
    const { reservationNumber, mobileNumber, checkInDate } = filter;
    const params = new URLSearchParams({
      reservation_number: reservationNumber,
      guest_mobile_number: mobileNumber,
      check_in_date_time: checkInDate,
      page: currentPage,
      page_size: reservationsPerPage,
    });

    setLoading(true); // Set loading to true before the API call

    fetch(`https://fa-discoverresorts-atomberg-otp-automation.azurewebsites.net/api/hotel_guest_otp?code=0kXhvxi6lBJRJDRBTL9KMq05SnDsrgB4iyKy2-uoRgOAAzFu-DO6gA%3D%3D&${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setReservations(data.data); // Set the reservations data
        setTotalPages(data.total_pages); // Set the total number of pages
        setLoading(false); // Set loading to false after the API call
      })
      .catch((error) => {
        console.log('Error fetching reservations:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  };

  // Fetch reservations when filter, currentPage, or isFilterApplied changes
  useEffect(() => {
    if (isFilterApplied) {
      fetchReservations();
    }
  }, [ currentPage, isFilterApplied]); // Run when filter, currentPage, or isFilterApplied changes

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to toggle the filter pane
  const toggleFilterPane = () => setIsFilterOpen(!isFilterOpen);

  // Handle filter input changes (does not trigger API call)
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  // Handle reset filter
  const handleResetFilters = () => {
    setFilter({
      reservationNumber: '',
      mobileNumber: '',
      checkInDate: new Date().toISOString().split('T')[0], // Reset to today's date
    });
    setIsFilterApplied(false); // Reset filter applied state
  };

  // Handle apply filters
  const handleApplyFilters = () => {
    setIsFilterApplied(false);
    setIsFilterApplied(true); // Mark filters as applied
    fetchReservations();
    toggleFilterPane(); // Close filter pane after applying
  };

  return (
    <div className="container mt-4 position-relative">
      <CustomHelmet title={title}></CustomHelmet>
      <div className="row d-flex align-items-center mb-3">
        <div className="col-12 col-md-6">
          <h2>Reservations</h2>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-md-end">
          <button className="btn btn-primary" onClick={toggleFilterPane}>
            <FaFilter /> Filter
          </button>
        </div>
      </div>

      {/* Right-side filter pane (overlay) */}
      <div className={`filter-pane ${isFilterOpen ? 'open' : ''}`}>
        <div className="filter-header">
          <h5>Filters</h5>
          <button className="btn-close" onClick={toggleFilterPane}>X</button>
        </div>
        <div className="filter-content">
          <p>Reservation Number</p>
          <input
            type="text"
            name="reservationNumber"
            value={filter.reservationNumber}
            onChange={handleFilterChange}
            placeholder="Enter reservation number"
            className="form-control"
          />
          <p>Mobile Number</p>
          <input
            type="text"
            name="mobileNumber"
            value={filter.mobileNumber}
            onChange={handleFilterChange}
            placeholder="Enter Mobile number"
            className="form-control"
          />
          <p>Check In Date</p>
          <input
            type="date"
            name="checkInDate"
            value={filter.checkInDate}
            onChange={handleFilterChange}
            className="form-control"
          />
          <button className="btn btn-secondary mt-3" onClick={handleApplyFilters}>
            Apply Filters
          </button>
          <button className="btn btn-light mt-2" onClick={handleResetFilters}>
            Reset Filters
          </button>
        </div>
      </div>

      {/* Loader - visible when loading */}
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}

      {/* Table visible only on medium to large screens */}
      <div className="table-responsive d-none d-md-block mt-4">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Reservation Number</th>
              <th>Guest Name</th>
              <th>Mobile Number</th>
              <th>Room Number</th>
              <th>Check In Date</th>
              <th>Check Out Date</th>
              <th>OTP</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res, index) => (
              <tr key={index}>
                <td>{res.reservation_number}</td>
                <td>{res.guest_name}</td>
                <td>{res.guest_mobile_number}</td>
                <td>{res.room_name}</td>
                <td>{new Date(res.check_in_date_time).toLocaleString()}</td>
                <td>{new Date(res.check_out_date_time).toLocaleString()}</td>
                <td>{res.generated_otp}</td>
                <td>
                  <span className={`badge ${res.otp_status === 'OTP Generated' ? 'bg-success' : 'bg-warning'}`}>
                    {res.otp_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards visible only on small screens */}
      <div className="d-block d-md-none mt-4">
        <div className="row">
          {reservations.map((res, index) => (
            <div className="col-12 mb-3" key={index}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Reservation: {res.reservation_number}</h5>
                  <p className="card-text">
                    <strong>Guest Name:</strong> {res.guest_name} <br />
                    <strong>Mobile Number:</strong> {res.guest_mobile_number} <br />
                    <strong>Room Number:</strong> {res.room_name} <br />
                    <strong>Check In Date:</strong> {new Date(res.check_in_date_time).toLocaleString()} <br />
                    <strong>Check Out Date:</strong> {new Date(res.check_out_date_time).toLocaleString()} <br />
                    <strong>OTP:</strong> {res.generated_otp} <br />
                    <strong>Status:</strong> <span className={`badge ${res.otp_status === 'OTP Generated' ? 'bg-success' : 'bg-warning'}`}>{res.otp_status}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center mt-4">
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Reservations;
