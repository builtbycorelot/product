import pathlib
import unittest

class TestReadme(unittest.TestCase):
    def test_has_configure_module_section(self):
        readme = pathlib.Path(__file__).resolve().parents[1] / "README.md"
        text = readme.read_text()
        self.assertIn("3D Home Configure Module & Catalog", text)

if __name__ == '__main__':
    unittest.main()
