export default function MinimalTest() {
  console.log('MinimalTest component rendering');
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">MINIMAL TEST</h1>
        <p className="text-xl">If you can see this, React is working!</p>
        <div className="mt-8 space-y-4">
          <p>✅ Component rendered successfully</p>
          <p>✅ Tailwind CSS is working</p>
          <p>✅ No JavaScript errors</p>
        </div>
      </div>
    </div>
  );
}
