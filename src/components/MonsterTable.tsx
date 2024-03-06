import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Monster {
  name: string;
  size: string;
  type: string;
  cr: number;
}

interface TableProps {
  endpoint: string;
}

const MonsterTable: React.FC<TableProps> = ({ endpoint }) => {
  const [data, setData] = useState<{ results: Monster[] } | null>(null); 
  const baseUrl = "http://localhost:5065/api/";

  useEffect(() => {
    fetch(`${baseUrl}${endpoint}`)
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => console.error('Error fetching data:', error));
  }, [endpoint]);

  return (
    <div>
      {data && data.results && data.results.length > 0 && (
        <Table className='w-full'>
          <TableCaption>Monsters</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">CR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.results.map((monster, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{monster.name}</TableCell>
                <TableCell>{monster.size}</TableCell>
                <TableCell>{monster.type}</TableCell>
                <TableCell className="text-right">{monster.cr}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default MonsterTable;
