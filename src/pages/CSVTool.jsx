import React, { useState } from "react";
import { Container, Button, Table, Thead, Tbody, Tr, Th, Td, Input } from "@chakra-ui/react";
import Papa from "papaparse";
import { FaUpload, FaDownload, FaPlus, FaTrash } from "react-icons/fa";

const CSVTool = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setHeaders(result.meta.fields);
        setData(result.data);
      },
    });
  };

  const handleAddRow = () => {
    setData([...data, {}]);
  };

  const handleRemoveRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleDownload = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "edited_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container maxW="container.xl" py={6}>
      <Input type="file" accept=".csv" onChange={handleFileUpload} mb={4} />
      <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddRow} mb={4}>
        Add Row
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <Td key={colIndex}>
                  <Input
                    value={row[header] || ""}
                    onChange={(e) => handleInputChange(rowIndex, header, e.target.value)}
                  />
                </Td>
              ))}
              <Td>
                <Button leftIcon={<FaTrash />} colorScheme="red" onClick={() => handleRemoveRow(rowIndex)}>
                  Remove
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button leftIcon={<FaDownload />} colorScheme="blue" onClick={handleDownload} mt={4}>
        Download CSV
      </Button>
    </Container>
  );
};

export default CSVTool;