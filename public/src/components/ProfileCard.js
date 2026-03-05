import React from 'react';
import { Component } from 'react';

export default class ProfileCard extends Component {

  render() {
    let user = this.props.user.user;
    return (
      <div className="container">
        <h1><span style={{marginRight: '15px'}}>👤</span>My Profile</h1>
        <div style={{background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', padding: '50px', borderRadius: '25px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}}>
          <div style={{textAlign: 'center', marginBottom: '35px'}}>
            <div style={{width: '120px', height: '120px', background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', borderRadius: '50%', margin: '0 auto 25px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.5)'}}>
              <span style={{fontSize: '3.5rem'}}>😊</span>
            </div>
            <h2 style={{color: '#111827', marginBottom: '8px', fontWeight: '800', fontSize: '1.8rem'}}>{user && user.name}</h2>
            <p style={{color: '#6b7280', fontWeight: '500', fontSize: '1.1rem'}}>@{user && user.username}</p>
          </div>
          
          <div style={{width: '80px', height: '4px', background: 'linear-gradient(90deg, #2563eb, #7c3aed)', margin: '0 auto 35px', borderRadius: '2px'}}></div>
          
          <div style={{padding: '0 20px'}}>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px', padding: '20px', background: '#f8fafc', borderRadius: '15px', transition: 'transform 0.2s'}}>
              <span style={{fontSize: '1.5rem', marginRight: '15px', width: '35px'}}>📝</span>
              <div>
                <div style={{fontSize: '0.85rem', color: '#6b7280', marginBottom: '5px', fontWeight: '500'}}>Full Name</div>
                <div style={{fontWeight: '700', color: '#111827', fontSize: '1.1rem'}}>{user && user.name}</div>
              </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px', padding: '20px', background: '#f8fafc', borderRadius: '15px'}}>
              <span style={{fontSize: '1.5rem', marginRight: '15px', width: '35px'}}>🔤</span>
              <div>
                <div style={{fontSize: '0.85rem', color: '#6b7280', marginBottom: '5px', fontWeight: '500'}}>Username</div>
                <div style={{fontWeight: '700', color: '#111827', fontSize: '1.1rem'}}>@{user && user.username}</div>
              </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px', padding: '20px', background: '#f8fafc', borderRadius: '15px'}}>
              <span style={{fontSize: '1.5rem', marginRight: '15px', width: '35px'}}>📧</span>
              <div>
                <div style={{fontSize: '0.85rem', color: '#6b7280', marginBottom: '5px', fontWeight: '500'}}>Email</div>
                <div style={{fontWeight: '700', color: '#111827', fontSize: '1.1rem'}}>{user && user.email}</div>
              </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', padding: '20px', background: user && user.isEmailVerified ? '#ecfdf5' : '#fef2f2', borderRadius: '15px'}}>
              <span style={{fontSize: '1.5rem', marginRight: '15px', width: '35px'}}>{user && user.isEmailVerified ? '✅' : '⚠️'}</span>
              <div>
                <div style={{fontSize: '0.85rem', color: '#6b7280', marginBottom: '5px', fontWeight: '500'}}>Email Status</div>
                <div style={{fontWeight: '700', color: user && user.isEmailVerified ? '#059669' : '#dc2626', fontSize: '1.1rem'}}>
                  {user && user.isEmailVerified ? 'Verified ✨' : 'Not Verified'}
                </div>
              </div>
            </div>
          </div>
          
          <div style={{marginTop: '35px', textAlign: 'center'}}>
            <p style={{color: '#9ca3af', fontSize: '0.9rem'}}>🎉 Thanks for being part of our community!</p>
          </div>
        </div>
      </div>
    );
  }
}
