export default function SimpleTest() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'black', 
      color: 'white', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>SIMPLE TEST</h1>
      <p style={{ fontSize: '1.5rem' }}>No imports, no dependencies, just HTML!</p>
      <div style={{ marginTop: '2rem' }}>
        <p>✅ React is working</p>
        <p>✅ Page loads without errors</p>
        <p>✅ Basic styling works</p>
      </div>
    </div>
  );
}
