import React from 'react';
import { getConvertDate } from '../helpers';

const Card = (props) => {

    const { id, firstName, lastName, email, dob, phone, picture } = props
    
    return (
        <div className="card card-custom">
            <div className="card-custom-header">
                <div style={{ display:'flex', justifyContent: 'flex-start', alignItems: 'center', color: 'black', fontSize: '12px', fontWeight: 'bold'}}>
                    Personnel ID :&nbsp;<span style={{ color: '#23c7c6', fontSize: '12px', fontWeight: 'bold'}}>{ id }</span>
                </div>
                <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" fill="currentColor" className="bi bi-circle-fill" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="8"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" fill="currentColor" className="bi bi-circle-fill" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="8"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" fill="currentColor" className="bi bi-circle-fill" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="8"/>
                    </svg>
                </div>
            </div>
            <div className="card-content">
                <div className="card-custom-image-container">
                    <div className="card-custom-image">
                        <img src={ picture } className="card-img-top" alt={`${firstName} ${lastName}`} />
                    </div>
                </div>
                <div className="card-body card-body-custom">
                    <div>
                        <p style={{marginBottom: 0, fontSize: '14px', fontWeight: 'bold'}}>Name</p>
                        <p style={{ fontSize: '14px'}}>{ firstName } { lastName }</p>
                    </div>
                    <div>
                        <p style={{marginBottom: 0, fontSize: '14px', fontWeight: 'bold'}}>Telephone</p>
                        <p style={{ fontSize: '14px'}}>{ phone }</p>
                    </div>
                    <div>
                        <p style={{marginBottom: 0, fontSize: '14px', fontWeight: 'bold'}}>Birthday</p>
                        <p style={{ fontSize: '14px'}}>{ getConvertDate(dob) }</p>
                    </div>
                    <div>
                        <p style={{marginBottom: 0, fontSize: '14px', fontWeight: 'bold' }}>Email</p>
                        <p className="tooltips">
                            { email }
                            <span className="tooltiptext ">{ email }</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Card;