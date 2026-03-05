import React from 'react';

const getEmojiForField = (label) => {
  const labelLower = label.toLowerCase();
  if (labelLower.includes('email')) return '📧';
  if (labelLower.includes('password')) return '🔒';
  if (labelLower.includes('username')) return '🔤';
  if (labelLower.includes('name')) return '👤';
  if (labelLower.includes('title')) return '📌';
  if (labelLower.includes('categor')) return '🏷️';
  return '✏️';
};

const renderField = ({ input, label, type, meta: { touched, error, invalid, warning } }) => (
  <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
    <label className="control-label" style={{display: 'flex', alignItems: 'center', fontWeight: '600', marginBottom: '8px'}}>
      <span style={{marginRight: '10px', fontSize: '1.2rem'}}>{getEmojiForField(label)}</span>
      {label}
    </label>
    <div>
      <input {...input} className="form-control" placeholder={label.replace('*', '')} type={type} autoComplete="off" style={{padding: '12px 16px', borderRadius: '12px', border: '2px solid #e5e7eb', fontSize: '1rem'}}/>
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

export default renderField;