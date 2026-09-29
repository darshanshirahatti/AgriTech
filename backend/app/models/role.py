from enum import Enum

class UserRole(str, Enum):
    FARMER = "FARMER"
    BUYER = "BUYER"
    EXPERT = "EXPERT"
    ADMIN = "ADMIN"