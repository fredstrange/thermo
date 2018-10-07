export default ({ label, temperatures = [] }) => (
  <div>
    <div>{label}</div>
    {/* for loop over temp.  */}
    <div>{Chimney}: {temperatures[1].celsius} C</div>
    <div>Inlet: {temperatures[0].celsius} C</div>
  </div>
)
