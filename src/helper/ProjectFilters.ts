import { categoryFilterType, skillFilterType } from "@/lib/types/FilterTypes";

export const skillFilter: skillFilterType[] = [
    { filterTitle: "React.js", filterKey: "react", category: "Frontend" },
    { filterTitle: "Next.js", filterKey: "next", category: "Frontend" },
    { filterTitle: "Vue.js", filterKey: "vue", category: "Frontend" },
    { filterTitle: "Angular", filterKey: "angular", category: "Frontend" },
    { filterTitle: "JavaScript", filterKey: "javascript", category: "Frontend" },
    { filterTitle: "TypeScript", filterKey: "typescript", category: "Frontend" },
    { filterTitle: "Node.js", filterKey: "node", category: "Backend" },
    { filterTitle: "Express.js", filterKey: "express", category: "Backend" },
    { filterTitle: "NestJS", filterKey: "nest", category: "Backend" },
    { filterTitle: "Django", filterKey: "django", category: "Backend" },
    { filterTitle: "Flask", filterKey: "flask", category: "Backend" },
    { filterTitle: "Spring Boot", filterKey: "springboot", category: "Backend" },
    { filterTitle: "ASP.NET", filterKey: "aspnet", category: "Backend" },
    { filterTitle: "Go", filterKey: "go", category: "Backend" },
    { filterTitle: "Rust", filterKey: "rust", category: "Backend" },
    { filterTitle: "Ruby on Rails", filterKey: "rails", category: "Backend" },
    { filterTitle: "Laravel", filterKey: "laravel", category: "Backend" },
    { filterTitle: "PHP", filterKey: "php", category: "Backend" },
    { filterTitle: "PostgreSQL", filterKey: "postgresql", category: "Database" },
    { filterTitle: "MySQL", filterKey: "mysql", category: "Database" },
    { filterTitle: "MongoDB", filterKey: "mongodb", category: "Database" },
    { filterTitle: "Redis", filterKey: "redis", category: "Database" },
    { filterTitle: "Firebase", filterKey: "firebase", category: "Database" },
    { filterTitle: "SQLite", filterKey: "sqlite", category: "Database" },
    { filterTitle: "Cassandra", filterKey: "cassandra", category: "Database" },
    { filterTitle: "GraphQL", filterKey: "graphql", category: "API" },
    { filterTitle: "REST API", filterKey: "restapi", category: "API" },
    { filterTitle: "WebSockets", filterKey: "websockets", category: "API" },
    { filterTitle: "gRPC", filterKey: "grpc", category: "API" },
    { filterTitle: "AWS", filterKey: "aws", category: "Cloud" },
    { filterTitle: "Azure", filterKey: "azure", category: "Cloud" },
    { filterTitle: "Google Cloud", filterKey: "gcp", category: "Cloud" },
    { filterTitle: "Docker", filterKey: "docker", category: "DevOps" },
    { filterTitle: "Kubernetes", filterKey: "kubernetes", category: "DevOps" },
    { filterTitle: "Terraform", filterKey: "terraform", category: "DevOps" },
    { filterTitle: "CI/CD", filterKey: "cicd", category: "DevOps" },
    { filterTitle: "Jenkins", filterKey: "jenkins", category: "DevOps" },
    { filterTitle: "GitHub Actions", filterKey: "githubactions", category: "DevOps" },
    { filterTitle: "Ansible", filterKey: "ansible", category: "DevOps" },
    { filterTitle: "Tailwind CSS", filterKey: "tailwind", category: "Frontend" },
    { filterTitle: "Bootstrap", filterKey: "bootstrap", category: "Frontend" },
    { filterTitle: "Material UI", filterKey: "mui", category: "Frontend" },
    { filterTitle: "Chakra UI", filterKey: "chakraui", category: "Frontend" },
    { filterTitle: "Figma", filterKey: "figma", category: "Design" },
    { filterTitle: "Adobe XD", filterKey: "adobexd", category: "Design" },
    { filterTitle: "React Native", filterKey: "reactnative", category: "Mobile" },
    { filterTitle: "Flutter", filterKey: "flutter", category: "Mobile" },
    { filterTitle: "Swift", filterKey: "swift", category: "Mobile" },
    { filterTitle: "Kotlin", filterKey: "kotlin", category: "Mobile" },
    { filterTitle: "Unity", filterKey: "unity", category: "Game Development" },
    { filterTitle: "Unreal Engine", filterKey: "unreal", category: "Game Development" },
    { filterTitle: "Three.js", filterKey: "threejs", category: "Game Development" },
    { filterTitle: "C#", filterKey: "csharp", category: "Programming Languages" },
    { filterTitle: "C++", filterKey: "cpp", category: "Programming Languages" },
    { filterTitle: "Python", filterKey: "python", category: "Programming Languages" },
    { filterTitle: "Java", filterKey: "java", category: "Programming Languages" },
    { filterTitle: "Scala", filterKey: "scala", category: "Programming Languages" },
    { filterTitle: "Elixir", filterKey: "elixir", category: "Programming Languages" },
    { filterTitle: "R", filterKey: "r", category: "Programming Languages" },
    { filterTitle: "Shell Scripting", filterKey: "shell", category: "DevOps" },
    { filterTitle: "Machine Learning", filterKey: "ml", category: "AI/ML" },
    { filterTitle: "Deep Learning", filterKey: "dl", category: "AI/ML" },
    { filterTitle: "TensorFlow", filterKey: "tensorflow", category: "AI/ML" },
    { filterTitle: "PyTorch", filterKey: "pytorch", category: "AI/ML" },
    { filterTitle: "Data Science", filterKey: "datascience", category: "AI/ML" },
    { filterTitle: "Big Data", filterKey: "bigdata", category: "AI/ML" },
    { filterTitle: "Hadoop", filterKey: "hadoop", category: "AI/ML" },
    { filterTitle: "Apache Spark", filterKey: "spark", category: "AI/ML" },
    { filterTitle: "Cybersecurity", filterKey: "cybersecurity", category: "Security" },
    { filterTitle: "Penetration Testing", filterKey: "pentesting", category: "Security" },
    { filterTitle: "Blockchain", filterKey: "blockchain", category: "Blockchain" },
    { filterTitle: "Solidity", filterKey: "solidity", category: "Blockchain" },
    { filterTitle: "Smart Contracts", filterKey: "smartcontracts", category: "Blockchain" },
    { filterTitle: "IoT", filterKey: "iot", category: "Embedded Systems" },
    { filterTitle: "Embedded C", filterKey: "embeddedc", category: "Embedded Systems" },
    { filterTitle: "Arduino", filterKey: "arduino", category: "Embedded Systems" },
    { filterTitle: "Raspberry Pi", filterKey: "raspberrypi", category: "Embedded Systems" }
];



export const categoryFilter:categoryFilterType[] = [
    { filterTitle: "Web Development", filterKey: "webdev" },
    { filterTitle: "Mobile Development", filterKey: "mobiledev" },
    { filterTitle: "UI/UX Design", filterKey: "uiux" },
    { filterTitle: "Backend Development", filterKey: "backend" },
    { filterTitle: "Frontend Development", filterKey: "frontend" },
    { filterTitle: "Full Stack Development", filterKey: "fullstack" },
    { filterTitle: "DevOps", filterKey: "devops" },
    { filterTitle: "Cloud Computing", filterKey: "cloud" },
    { filterTitle: "Data Science", filterKey: "datascience" },
    { filterTitle: "Machine Learning", filterKey: "ml" },
    { filterTitle: "Cybersecurity", filterKey: "cybersecurity" },
    { filterTitle: "Blockchain", filterKey: "blockchain" },
    { filterTitle: "Game Development", filterKey: "gamedev" },
    { filterTitle: "Embedded Systems", filterKey: "embedded" },
    { filterTitle: "Internet of Things (IoT)", filterKey: "iot" },
    { filterTitle: "AI & NLP", filterKey: "ai-nlp" },
    { filterTitle: "Testing & QA", filterKey: "testing" },
    { filterTitle: "AR/VR Development", filterKey: "arvr" },
    { filterTitle: "Automation", filterKey: "automation" },
    { filterTitle: "Technical Writing", filterKey: "techwriting" },
];
