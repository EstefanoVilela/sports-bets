export const InputGroup = ({ label, value, handler, textOnButton, action }) => (
  <div className="row mb-3">
    <label htmlFor="" className="col-4 col-form-label">{ label }</label>
    <div className="col-8">
      <div className="input-group mb-3">
        <input type="text" value={ value } onChange={ ev => handler(ev.currentTarget.value) } className="form-control" />
        <button type="button" onClick={ action } className="btn btn-primary">{ textOnButton }</button>
      </div>
    </div>
  </div>
);