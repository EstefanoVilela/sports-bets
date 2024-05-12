export const Select = ({ label, optionsForSelect, value, handler }) => {
  if (!optionsForSelect || optionsForSelect.length === 0) {
    return null;
  }

  return (
    <div className="row mb-3">
      <label htmlFor="" className="col-4 col-form-label">{ label }</label>
      <div className="col-8">
        <select value={ value } className="form-control" onChange={ ev => handler(ev.currentTarget.value) }>
          <option key="0" value="0">---</option>
          {
            optionsForSelect.map(({ id, name }) => (
              <option key={ id } value={ id }>{ name }</option>
            ))
          }
        </select>
      </div>
    </div>
  )
};