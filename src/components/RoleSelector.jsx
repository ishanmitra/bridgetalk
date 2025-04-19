const RoleSelector = ({ onSelect }) => (
  <div className="w-full">
    <div className="flex justify-center gap-4">
      <div className="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
        <div className="bg-white space-y-1.5 p-6 flex flex-col items-center gap-4">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Speaker A</h3>
          <p className="text-sm text-muted-foreground">Join as the first speaker who will talk</p>
          <button
            onClick={() => onSelect("A")}
            className="text-white inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
          >
            Select Role
          </button>
        </div>
      </div>
      <div className="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
        <div className="bg-white space-y-1.5 p-6 flex flex-col items-center gap-4">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Speaker B</h3>
          <p className="text-sm text-muted-foreground">Join as the first speaker who will type</p>
          <button
            onClick={() => onSelect("B")}
            className="text-white inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
          >
            Select Role
          </button>
        </div>
      </div>
    </div>
  </div >
);

export default RoleSelector;
