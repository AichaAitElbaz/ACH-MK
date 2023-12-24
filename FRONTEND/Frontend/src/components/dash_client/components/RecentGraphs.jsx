// Importez le module URL de JavaScript pour manipuler les URLs
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

export default function RecentGraphs() {
  const user = useSelector(state => state.auth.user);
  const [userGraphs, setUserGraphs] = useState([]);

  // Fonction pour construire l'URL du fichier à partir du chemin
  const getFileUrl = (filePath) => {
    return `http://localhost:8000/media/${filePath}`;
  };

  useEffect(() => {
    const fetchUserGraphs = async () => {
      try {
        const response = await fetch(`http://localhost:8000/account/api/get_user_graphs/${user.id}/`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setUserGraphs(data.user_graphs);
        } else {
          console.error('Failed to fetch user graphs');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (user) {
      fetchUserGraphs();
    }
  }, [user]);

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Recent Graphs</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>Graph ID</th>
              <th>File Name</th>
              <th>Graph image</th>
              <th>Graph Date</th>
              <th>Interpretation</th>
            </tr>
          </thead>
          <tbody>
            {userGraphs.map((graph) => (
              <tr key={graph.id}>
                <td>{graph.id}</td>
                <td>
                  {/* Affichez le nom du fichier comme un lien vers l'URL du fichier */}
                  <a href={getFileUrl(graph.source_file)} target="_blank" rel="noopener noreferrer">
                    {graph.source_file}
                  </a>
                </td>
                <td>
                  {/* Affichez le nom du fichier comme un lien vers l'URL du fichier */}
                  <a href={getFileUrl(graph.graph)} target="_blank" rel="noopener noreferrer">
                    {graph.graph}
                  </a>
                </td>
                <td>{format(new Date(graph.date_uploaded), 'dd MMM yyyy')}</td>
                <td>
					 {/* Affichez le nom du fichier comme un lien vers l'URL du fichier */}
					 <a href={getFileUrl(graph.interpretation)} target="_blank" rel="noopener noreferrer">
                    {graph.interpretation}
                  </a>
				</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
