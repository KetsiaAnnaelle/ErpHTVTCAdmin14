import React from 'react';

const DashboardDepense = () => {
    if (JSON.parse(localStorage.getItem('user')).role !== 'admin') {
        window.location.replace('/')
    }
    return (
        <div>

        </div>
    );
};

export default DashboardDepense;