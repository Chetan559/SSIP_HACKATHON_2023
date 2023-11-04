import torch
import torch.nn as nn

# Defineing a custom neural network class that inherits from nn.Module(NeuralNet).
class NeuralNet(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super(NeuralNet, self).__init__()
        
        #the layers of the neural network.
        self.l1 = nn.Linear(input_size, hidden_size)  # First fully connected layer
        self.l2 = nn.Linear(hidden_size, hidden_size)  # Second fully connected layer
        self.l3 = nn.Linear(hidden_size, num_classes)  # Output layer
        self.relu = nn.ReLU()  # Rectified Linear Unit (ReLU) activation function

    def forward(self, x):
        # Forward pass of the neural network.
        out = self.l1(x)  # Pass input through the first layer
        out = self.relu(out)  # Applying the ReLU activation function
        out = self.l2(out)  # Pass the result through the second layer
        out = self.relu(out)  # Applying ReLU activation again
        out = self.l3(out)  # Pass the result through the output layer
        return out
