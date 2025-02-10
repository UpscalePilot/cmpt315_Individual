const orders = [
    {
     id: 101, customer: "Alice",
     products: [
     { name: "Laptop", category: "Electronics", price: 1200, quantity: 1 },
     { name: "Mouse", category: "Electronics", price: 25, quantity: 2 },
     { name: "Notebook", category: "Stationery", price: 5, quantity: 5 } ]
    },
    {
     id: 102, customer: "Bob",
     products: [
     { name: "T-shirt", category: "Clothing", price: 20, quantity: 3 },
     { name: "Jeans", category: "Clothing", price: 40, quantity: 1 },
     { name: "Cap", category: "Accessories", price: 15, quantity: 2 } ]
    }
];


function summarizeOrders(orders) {
    return orders.map(order => {
        const { id, customer, products } = order;
        const totalAmount = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
        const categories = products.reduce((acc, product) => {
            acc[product.category] = (acc[product.category] || 0) + product.quantity;
            return acc;
        }, {});
        
        return {
            orderId: id,
            customer: customer,
            totalAmount: totalAmount,
            categories: categories
        };
    });
}
console.log("Task 1");
console.log(summarizeOrders(orders));

const employees = [
    { id: 1, name: "John", department: "Sales", salary: 60000, yearsOfExperience: 5, performanceRating: 85 },
    { id: 2, name: "Jane", department: "Sales", salary: 65000, yearsOfExperience: 4, performanceRating: 90 },
    { id: 3, name: "Doe", department: "HR", salary: 50000, yearsOfExperience: 6, performanceRating: 75 },
    { id: 4, name: "Smith", department: "Sales", salary: 70000, yearsOfExperience: 3, performanceRating: 80 },
    { id: 5, name: "Emily", department: "Sales", salary: 72000, yearsOfExperience: 2, performanceRating: 88 }
];

const criteria = {
    department: "Sales",
    minPerformance: 80,
    minExperience: 3,
    maxSalary: 70000
};

function getTopPerformers(employees, criteria) {
    return employees
        .filter(employee => 
            employee.department === criteria.department &&
            employee.performanceRating >= criteria.minPerformance &&
            employee.yearsOfExperience >= criteria.minExperience &&
            employee.salary < criteria.maxSalary
        )
        .sort((a, b) => 
            b.performanceRating - a.performanceRating || a.salary - b.salary
        );
}
console.log("Task 2");
console.log(getTopPerformers(employees, criteria));


function regionalSalesSummary(salesRecords) {
    return salesRecords.reduce((summary, record) => {
        const { region, salesperson, salesAmount } = record;
        if (!summary[region]) {
            summary[region] = {
                totalSales: 0,
                salesAmounts: [],
                salespeople: new Set()
            };
        }
        summary[region].totalSales += salesAmount;
        summary[region].salesAmounts.push(salesAmount);
        summary[region].salespeople.add(salesperson);
        return summary;
    }, {});
}

function finalizeSummary(summary) {
    return Object.keys(summary).map(region => {
        const { totalSales, salesAmounts, salespeople } = summary[region];
        return {
            region,
            totalSales,
            averageSales: totalSales / salesAmounts.length,
            salespeople: Array.from(salespeople)
        };
    });
}

const salesRecords = [
    { region: "North", salesperson: "Alice", salesAmount: 1200, date: "2023-01-01" },
    { region: "North", salesperson: "Bob", salesAmount: 1500, date: "2023-01-02" },
    { region: "South", salesperson: "Alice", salesAmount: 1800, date: "2023-01-03" },
    { region: "South", salesperson: "Charlie", salesAmount: 2000, date: "2023-01-04" },
    { region: "North", salesperson: "Alice", salesAmount: 1300, date: "2023-01-05" }
];

const summary = regionalSalesSummary(salesRecords);
console.log("Task 3");
console.log(finalizeSummary(summary));


function deepFlattenAndExtract(input) {
    if (typeof input === 'number') {
        return [input];
    } else if (Array.isArray(input)) {
        return input.reduce((acc, item) => acc.concat(deepFlattenAndExtract(item)), []);
    } else if (typeof input === 'object' && input !== null) {
        return Object.values(input).reduce((acc, value) => acc.concat(deepFlattenAndExtract(value)), []);
    } else {
        return [];
    }
}

const nestedStructure = [
    1, 
    [2, 3, { a: 4, b: "ignore" }], 
    { c: 5, d: [6, { e: 7 }] },  
    'text',  
    [8, [9, 10]]
];
console.log("Task 4");
console.log(deepFlattenAndExtract(nestedStructure));


function analyzeStudentPerformance(students) {
    const allScores = students.flatMap(student => student.scores);
    const highestScore = Math.max(...allScores);
    const lowestScore = Math.min(...allScores);
    const overallAverage = allScores.reduce((sum, score) => sum + score, 0) / allScores.length;

    const studentAverages = students.map(({ name, scores }) => ({
        name,
        average: scores.reduce((sum, score) => sum + score, 0) / scores.length
    })).sort((a, b) => b.average - a.average);

    return {
        highestScore,
        lowestScore,
        overallAverage,
        studentAverages
    };
}

const students = [
    { name: "Alice", scores: [85, 92, 78] },
    { name: "Bob", scores: [79, 95, 88] },
    { name: "Charlie", scores: [90, 85, 85] }
];

console.log("Task 5");
console.log(analyzeStudentPerformance(students));


