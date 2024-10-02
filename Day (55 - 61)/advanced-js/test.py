# my_dict = {
#         'ab': 'c',
#         'bc': 'a',
#         'ca': 'b',
#         'ba': 'c',
#         'cb': 'a',
#         'ac': 'b'
#     }
    
# if 'a' in s and 'b' not in s and 'c' not in s:
#     return len(s)
# if 'a' not in s and 'b' in s and 'c' not in s:
#         return len(s)
# if 'a' not in s and 'b' not in s and 'c' in s:
#         return len(s)
    
#     '''['a', 'b', 'b', 'c', 'a', 'a', 'b']'''
#     while not ('a' in s and 'b' not in s and 'c' not in s or 'a' not in s and 'b' in s and 'c' not in s or 'a' not in s and 'b' not in s and 'c' in s):
#         reduc_str = ''
#         for i in range(0, len(s), 2):
#             if i == len(s) - 1:
#                 reduc_str += s[i]
#                 continue
#             if s[i] == s[i+1]:
#                 reduc_str += s[i]
#                 i -= 1
#                 continue
#             reduc_str += my_dict[s[i:i+2]]
#         s = reduc_str
        
#     return len(s)