import { Button } from "antd";
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export const DownloadFilePdf = ({ data, fileName }) => {


    const handleDownload = () => {
        if (!data || data.length === 0) {

            alert('No data available to generate the PDF')
            console.error('No data available to generate the PDF');
            return;
        }

        const doc = new jsPDF();

        // Define the columns we want to display 
        const columns = [
            { header: 'Agent', dataKey: 'Agent' },
            { header: 'Amount', dataKey: 'Amount' },
            { header: 'Client', dataKey: 'Client' },
            { header: 'Date', dataKey: 'Date' },
            { header: 'Loss', dataKey: 'Loss' },
            { header: 'Profit', dataKey: 'Profit' },
            { header: 'Rate', dataKey: 'Rate' },
            // { header: 'Runs', dataKey: 'Runs' },
            { header: 'Team', dataKey: 'Team' },

        ];

        // Filter the data to only include the specified fields
        const filteredData = data.map(item => ({
            Agent: item.Agent,
            Amount: item.Amount,
            Client: item.Client,
            Date: item.Date,
            Loss: item.Loss,
            Profit: item.Profit,
            Rate: item.Rate,
            // Runs: item.Runs,
            Team: item.Team,

        }));

        // Use autoTable to create the table in the PDF
        doc.autoTable({
            head: [columns.map(col => col.header)],
            body: filteredData.map(item => columns.map(col => item[col.dataKey])),

            startY: 10,
            styles: {
                // cellWidth: 'wrap',
                cellHeight: 'wrap',
                lineColor: [0, 0, 0], // black border color
                lineWidth: 0.1, // border width in mm
                fontSize: 8
            },
            headStyles: {
                fillColor: false, // Remove background color for the table header
                textColor: [0, 0, 0], // Set text color for the table header
                // lineWidth: 0 // Remove border for the table header
            }
        });

        doc.save(`${fileName}.pdf`);
    };

    return (
        <Button onClick={() => handleDownload()} className="gx-border-redius0 gx-bg-flex gx-align-items-center" type="primary">
            <span className="ml-1 px-1">PDF</span>
        </Button>
    );
};