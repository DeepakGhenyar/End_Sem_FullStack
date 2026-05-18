const axios = require('axios');
const Employee = require('../models/Employee');

exports.recommend = async (req, res) => {
    try {
        const { employeeId } = req.body;
        
        let employeesData = [];
        let prompt = "";

        if (employeeId) {
            const employee = await Employee.findById(employeeId);
            if (!employee) {
                return res.status(404).json({ message: "Employee not found" });
            }
            employeesData = [employee];
            prompt = `Analyze this employee: Name: ${employee.name}, Department: ${employee.department}, Score: ${employee.performanceScore}, Skills: ${employee.skills.join(', ')}. 
            Please provide: 
            1. Promotion suggestion based on score (e.g. >80 is High performance employee -> Promotion suggestion)
            2. Improvement feedback (e.g. <60 is Low score employee -> Improvement feedback)
            3. Skill enhancement recommendation if skills are lacking or missing.`;
        } else {
            employeesData = await Employee.find();
            prompt = `Analyze these employees and provide Ranked recommendations (1, 2, 3...) based on their performance score and experience.
            Employees: ${JSON.stringify(employeesData.map(e => ({name: e.name, score: e.performanceScore, exp: e.experience})))}`;
        }

        // Mock AI logic if API Key is not present (for exam purposes)
        if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === 'your_openrouter_api_key') {
            console.log("No API key provided, using mock response.");
            if (employeeId) {
                const emp = employeesData[0];
                let mockRec = "";
                if (emp.performanceScore >= 80) mockRec = "Promotion suggestion: Highly recommended for promotion based on high performance score.";
                else if (emp.performanceScore < 60) mockRec = "Improvement feedback: Needs to improve core competencies and performance score.";
                else mockRec = "Doing okay, maintain consistency.";
                
                if (!emp.skills || emp.skills.length === 0) mockRec += " | Skill enhancement recommendation: Needs training in basic department skills.";

                return res.json({ recommendation: mockRec });
            } else {
                return res.json({ 
                    recommendation: "Ranked recommendations:\n1. Top performers\n2. Average performers\n3. Needs improvement" 
                });
            }
        }

        // Actual API Call
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: "meta-llama/llama-3-8b-instruct:free",
            messages: [{ role: "user", content: prompt }]
        }, {
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        res.json({ recommendation: response.data.choices[0].message.content });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
