import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Spell {
  name: string;
  level: string;
  school: string;
}

interface TableProps {
  endpoint: string;
}

const SpellTable: React.FC<TableProps> = ({ endpoint }) => {
  const [data, setData] = useState<{ results: Spell[] } | null>(null);
  const baseUrl = 'http://localhost:5010/api/';

  useEffect(() => {
    fetch(`${baseUrl}${endpoint}`)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error('Error fetching data:', error));
  }, [endpoint]);

  return (
    <div>
      {data && data.results && data.results.length > 0 && (
        <Table className="w-full">
          <TableCaption>Spells</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Level</TableHead>
              <TableHead className="text-right">School</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.results.map((spell, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{spell.name}</TableCell>
                <TableCell>{spell.level}</TableCell>
                <TableCell className="text-right">{spell.school}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default SpellTable;
