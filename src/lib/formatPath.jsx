import { Link } from "react-router-dom";

export default function formatPath(path, className = "mt-2 font-medium text-sm") {
  const jsxPath = (
    <div className={`flex gap-2 capitalize ${className}`}>
      <div className="flex gap-1">
        <span className="text-slate-600">{`>`}</span>
        <Link to="/" className="hover:underline focus:underline">
          Acceuil
        </Link>
      </div>

      {path.map(({ name, path }) => (
        <div key={name} className="flex gap-1 max-w-[700px] line-clamp-2">
          <div className="flex gap-1">
            <span className="text-slate-600">{`>`}</span>
            <Link to={path} className="hover:underline focus:underline">
              {name}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
  return jsxPath;
}
