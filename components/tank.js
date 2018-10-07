export default ({ label, temperatures = [] }) => (
  <div>
    <div>{label}</div>
    <div>Top: {temperatures[2].celsius} C</div>
    <div>Middle: {temperatures[1].celsius} C</div>
    <div>Bottom: {temperatures[0].celsius} C</div>
  </div>
)
