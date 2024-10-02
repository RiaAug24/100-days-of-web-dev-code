import math
# def staircase(n):
#     # Write your code here
#     for i in range(1, n+1):
#         print(" "*(n-i)+ "#"*i)
        


# staircase(6)

minSum = 0
maxSum = 0
arr = [3, 7, 1, 5, 9]
for i in range(0, 5, 1):
       sum = 0
       for j in range(0, 5, 1):
              if i == j:
                     continue
              sum += arr[j]
       if i == 0:
              minSum = sum
       elif sum < minSum:
              minSum = sum
       if sum > maxSum:
              maxSum = sum

print(minSum, maxSum)