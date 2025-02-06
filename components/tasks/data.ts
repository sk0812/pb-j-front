import { Category } from "./types";

export const categories: Category[] = [
  {
    title: "Self",
    description: "Take care of your personal well-being",
    color: "#16A34A",
    tasks: [
      {
        id: "self-1",
        title: "Meditate",
        description: "10 minutes of mindfulness",
        scientificBenefit:
          "Meditation reduces stress by lowering cortisol levels and increases gray matter in areas of the brain associated with self-awareness, compassion, and introspection.",
        hasCounter: true,
        counterTarget: 10,
        counterUnit: "minutes",
      },
      {
        id: "self-2",
        title: "Read a Book",
        description: "30 minutes of reading",
        scientificBenefit:
          "Reading improves memory, reduces stress by up to 68%, and may lower the risk of Alzheimer's by keeping your brain active and engaged.",
        hasCounter: true,
        counterTarget: 30,
        counterUnit: "minutes",
      },
      {
        id: "self-3",
        title: "Exercise",
        description: "45 minutes of physical activity",
        scientificBenefit:
          "Exercise releases endorphins, increases BDNF protein production which supports neuron growth, and improves cardiovascular health by 30-40%.",
        hasCounter: true,
        counterTarget: 45,
        counterUnit: "minutes",
      },
    ],
  },
  {
    title: "Others",
    description: "Make a positive impact on those around you",
    color: "#0284C7",
    tasks: [
      {
        id: "others-1",
        title: "Random Act of Kindness",
        description: "Do something nice for someone",
        scientificBenefit:
          "Acts of kindness increase oxytocin production, reducing blood pressure and inflammation while boosting positive mood and social connection.",
      },
      {
        id: "others-2",
        title: "Call a Friend",
        description: "Connect with someone you care about",
        scientificBenefit:
          "Social connections increase longevity by 50%, boost immune system function, and reduce anxiety by triggering the release of oxytocin.",
      },
      {
        id: "others-3",
        title: "Share Knowledge",
        description: "Teach something new to others",
        scientificBenefit:
          "Teaching others reinforces your own learning, increases neural connections, and boosts confidence through the protégé effect.",
      },
    ],
  },
  {
    title: "Earth",
    description: "Contribute to environmental well-being",
    color: "#7C3AED",
    tasks: [
      {
        id: "earth-1",
        title: "Reduce Plastic",
        description: "Avoid single-use plastics today",
        scientificBenefit:
          "Reducing plastic use decreases endocrine disruptors in your body and helps preserve marine ecosystems that produce 70% of our oxygen.",
      },
      {
        id: "earth-2",
        title: "Save Energy",
        description: "Turn off unused electronics and lights",
        scientificBenefit:
          "Reducing energy consumption lowers carbon emissions and exposure to electromagnetic fields, which may affect sleep quality and stress levels.",
      },
      {
        id: "earth-3",
        title: "Walk or Cycle",
        description: "Choose eco-friendly transportation",
        scientificBenefit:
          "Active transportation reduces carbon emissions while moderate exercise improves cognitive function by up to 20% through increased blood flow.",
        hasCounter: true,
        counterTarget: 3,
        counterUnit: "km",
      },
    ],
  },
]; 