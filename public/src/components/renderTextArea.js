import React from 'react';

const renderTextArea = ({ input, label, type, meta: { touched, error, invalid, warning } }) => (
  <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
    <label className="control-label" style={{display: 'flex', alignItems: 'center', fontWeight: '600', marginBottom: '8px'}}>
      <span style={{marginRight: '10px', fontSize: '1.2rem'}}>📝</span>
      {label}
    </label>
    <div>
      <textarea 
        {...input} 
        className="form-control" 
        placeholder={label.replace('*', '')} 
        type={type}
        style={{minHeight: '150px', resize: 'vertical', padding: '14px 16px', borderRadius: '12px', border: '2px solid #e5e7eb', fontSize: '1rem', lineHeight: '1.6'}}
        autoComplete="off"
      />
      {touched && error && (
        <div className="help-block" style={{color: '#dc2626', marginTop: '8px', fontWeight: '500', display: 'flex', alignItems: 'center'}}>
          <span style={{marginRight: '6px'}}>❌</span>
          {error}
        </div>
      )}
      {touched && warning && (
        <div className="help-block" style={{color: '#d97706', marginTop: '8px', fontWeight: '500', display: 'flex', alignItems: 'center'}}>
          <span style={{marginRight: '6px'}}>⚠️</span>
          {warning}
        </div>
      )}
    </div>
  </div>
)

export default renderTextArea;