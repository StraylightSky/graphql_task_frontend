import React, { Component } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

class ReusableTable extends Component {
  render() {
    const { headers, rows } = this.props;
    const tableHeadings = headers.map((header, i) => {
      const value = header.name || header;
      return(
        <TableCell key={`${header}-${i}`}>{value}</TableCell>
      );
    });
    let tableRows = rows.map((row, i) => {
      const rowKey = `tr-${row}-${i}`;
      const cells = row.cells.map((cell, j) => {
        const { data } = cell;
        const cellKey = `td-${cell}-${j}`;
        const value = data || cell;
        return(
          <TableCell key={cellKey}>{value}</TableCell>
        );
      });
      return(
        <TableRow key={rowKey}>
          {cells}
        </TableRow>
      );
    });

    return(
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeadings}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default ReusableTable;
