class SequenceChecker:
    def isSubSequence(self, s1, s2, m, n):
        if m == 0:
            return True
        if n == 0:
            return False
        
        if s1[m-1] == s2[n-1]:
            return self.isSubSequence(s1, s2, m-1, n-1)
        
        return self.isSubSequence(s1, s2, m, n-1)

class Solution:
    def lengthOfLongestSubstring(self, s):
        """
        :type s: str
        :rtype: int
        """
        sub_str = ''
        len_long_sub_str = 0
        for x in s:
            if x not in sub_str:
                sub_str += x
        
        # Ensure SequenceChecker class instance is used
        flag = SequenceChecker().isSubSequence(sub_str, s, len(sub_str), len(s))
        print(flag)
        if flag:
            return len(sub_str)
      
        if not flag:
            new_sub_str = ''
            i = len(sub_str) - 1
            while i > 0:
                new_sub_str += sub_str[i]
                i -= 1
        
        return len(new_sub_str)
# Example usage
sol = Solution()
print(sol.lengthOfLongestSubstring("wkwffsfqew"))  # Output should be 3