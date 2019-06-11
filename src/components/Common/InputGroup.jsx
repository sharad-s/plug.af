import React from 'react';

const InputGroup = ( {name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange

}) => {
  return(
    <div className="form-group">
          <input type={type} className="form-control" placeholder={placeholder} name={name}
          value={value} onChange={onChange} />
          { info && <small className="form-text text-muted">{info}</small>}
      { error  && (<div class="invalid-feedback">
  {error}
</div>)}
          </div>

  )

}
export default InputGroup;