import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { getGraphsStatus } from '../lib/helpers';

const recentGraphsData = [
  {
    graph_id: '5627',
    file_name: 'Ryan Carroll',
    graph_date: '2022-05-14T05:24:00',
    interpretation: 'Interprétation ',
  },
];

export default function RecentGraphs() {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Recent Graphs</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th className="text-center">Graph ID</th>
              <th className="text-center">File Name</th>
              <th className="text-center">Graph Date</th>
              <th className="text-center">Interpretation</th>
            </tr>
          </thead>
          <tbody>
            {recentGraphsData.map((graph) => (
              <tr key={graph.graph_id}>
                <td className="text-center">
                  <Link to={`/graph/${graph.graph_id}`}>#{graph.graph_id}</Link>
                </td>
                <td className="text-center">
                  <Link to={`/file/${graph.file_name}`}>{graph.file_name}</Link>
                </td>
                <td className="text-center">
                  {format(new Date(graph.graph_date), 'dd MMM yyyy')}
                </td>
                <td className="text-center">{graph.interpretation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
